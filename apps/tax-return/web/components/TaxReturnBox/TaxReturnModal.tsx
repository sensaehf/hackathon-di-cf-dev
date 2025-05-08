import {
  Box,
  Button,
  Divider,
  Icon,
  Input,
  ModalBase,
  Text,
  Tooltip,
} from '@island.is/island-ui/core'
import { Icon as IconType } from 'libs/island-ui/core/src/lib/IconRC/iconMap'
import { values } from 'lodash'
import { useEffect, useState } from 'react'
import { IncomeType } from '../../types/TaxReturnBoxProps'
import { gql, useMutation } from '@apollo/client'
import {
  TaxReturnBoxProps,
  SubCategory,
  Values,
} from '../../types/TaxReturnBoxProps'

import { useRouter } from 'next/router'
import en from '../../public/locales/en/stepper.json'
import is from '../../public/locales/is/stepper.json'

const translations: any = { en, is }

interface Modal {
  isVisible: boolean
  onClose: () => void
  data: SubCategory[]
  title: string
  description: string
  type?: IncomeType
}

const UpdateSalaryWorkPayment = gql`
  mutation UpdateSalaryWorkPayment(
    $updateSalaryWorkPaymentInput: UpdateSalaryWorkPaymentInput!
  ) {
    updateSalaryWorkPayment(
      updateSalaryWorkPaymentInput: $updateSalaryWorkPaymentInput
    ) {
      employerName
      amount
      currency
      description
      year
    }
  }
`

const CreateSalaryWorkPayment = gql`
  mutation CreateSalaryWorkPayment(
    $createSalaryWorkPaymentInput: CreateSalaryWorkPaymentInput!
  ) {
    createSalaryWorkPayment(
      createSalaryWorkPaymentInput: $createSalaryWorkPaymentInput
    ) {
      id
      taxSubmissionId
      employerName
      amount
      currency
      description
      year
    }
  }
`

const DeleteSalaryWorkPayment = gql`
  mutation DeleteSalaryWorkPayment($id: String!, $taxSubmissionId: Int!) {
    deleteSalaryWorkPayment(id: $id, taxSubmissionId: $taxSubmissionId)
  }
`
const DeletePerDiemAndPerks = gql`
  mutation DeletePerDiemAndPerk($id: String!, $taxSubmissionId: Int!) {
    deletePerDiemAndPerk(id: $id, taxSubmissionId: $taxSubmissionId)
  }
`
const DeleteGrantsMutation = gql`
  mutation DeletePensionsGrantsSubsidy($id: Int!, $taxSubmissionId: Int!) {
    deletePensionsGrantsSubsidy(id: $id, taxSubmissionId: $taxSubmissionId)
  }
`

export const TaxReturnModal: React.FC<Modal> = ({
  isVisible,
  onClose,
  data,
  title,
  description,
  type,
}) => {
  const { locale = 'en' } = useRouter()
  const t = translations[locale] || translations.en

  const [localData, setLocalData] = useState(() =>
    JSON.parse(JSON.stringify(data)),
  )

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    categoryIdx: number,
    itemIdx: number,
  ) => {
    const updatedData = [...localData]
    updatedData[categoryIdx].values[itemIdx].value = Number(e.target.value)
    setLocalData(updatedData)
  }

  const handleLabelChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    categoryIdx: number,
    itemIdx: number,
  ) => {
    const updatedData = [...localData]
    updatedData[categoryIdx].values[itemIdx].label = e.target.value
    setLocalData(updatedData)
  }

  const [createSalaryWorkPayment] = useMutation(CreateSalaryWorkPayment)
  const [updateSalaryWorkPayment] = useMutation(UpdateSalaryWorkPayment)
  const [deleteSalaryMutation] = useMutation(DeleteSalaryWorkPayment)
  const [deletePerDiemMutation] = useMutation(DeletePerDiemAndPerks)
  const [deleteGrantsMutation] = useMutation(DeleteGrantsMutation)

  const onConfirm = async () => {
    
    const inputs = localData.flatMap((category: any) =>
      category.values.map((item: any) => ({
        employerName: item.label,
        amount: item.value,
        currency: 'ISK',
        taxSubmissionId: 1,
        description: `Payment for ${item.label}`,
        year: 2025,
        new: item.id === undefined,
        id: item.id,
      })),
    )

    try {

      if(type !== IncomeType.Salary) {
        console.log('Ignoring unhandled income type:', type)
        return
      }

      for (const input of inputs) {
        console.log(input)        
        if (input.new) {
          // Run the create mutation
          const createVariables = {
            createSalaryWorkPaymentInput: {
              employerName: input.employerName,
              amount: input.amount,
              currency: input.currency,
              taxSubmissionId: input.taxSubmissionId,
              description: input.description,
              year: input.year,
            },
          }

          const createResponse = await createSalaryWorkPayment({
            variables: createVariables,
          })
          console.log(
            'Create mutation response for:',
            input.employerName,
            createResponse,
          )
        } else {
          // Run the update mutation
          const updateVariables = {
            updateSalaryWorkPaymentInput: {
              id: input.id,
              employerName: input.employerName,
              amount: input.amount,
              currency: input.currency,
              description: input.description,
              year: input.year,
            },
          }

          console.log('Update variables:', updateVariables)

          const updateResponse = await updateSalaryWorkPayment({
            variables: updateVariables,
          })
          console.log(
            'Update mutation response for:',
            input.employerName,
            updateResponse,
          )
        }
      }
    } catch (error) {
      console.error('Error executing mutation:', error)
    }
  }

  const handleDelete = async (
    type: IncomeType | undefined,
    id: string | undefined,
    categoryIdx: number,
    itemIdx: number,
  ) => {
    if (!id) {
      console.error('No ID provided for deletion')
      return
    }

    try {
      switch (type) {
        case IncomeType.Salary:
          console.log(`Running delete mutation for Salary with ID: ${id}`)
          await deleteSalaryMutation({ variables: { id, taxSubmissionId: 1 } })
          break

        case IncomeType.PerDiem:
          console.log(`Running delete mutation for Per Diem with ID: ${id}`)
          await deletePerDiemMutation({
            variables: { id: +id, taxSubmissionId: 1 },
          })
          break

        case IncomeType.Grants:
          console.log(`Running delete mutation for Grants with ID: ${id}`)
          await deleteGrantsMutation({
            variables: { id: +id, taxSubmissionId: 1 },
          })
          break

        default:
          console.error('Unknown type for deletion')
      }

      const updatedData = [...localData]
      updatedData[categoryIdx].values.splice(itemIdx, 1)
      setLocalData(updatedData)
    } catch (error) {
      console.error('Error executing delete mutation:', error)
    }
  }

  useEffect(() => {
    setLocalData(() => JSON.parse(JSON.stringify(data)))
  }, [data])
  return (
    <ModalBase baseId={'dialog'} isVisible={isVisible}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box background="white" width={'half'}>
          <Box
            display="flex"
            width="full"
            justifyContent={'flexEnd'}
            padding={3}
          >
            <Button
              colorScheme="negative"
              circle={true}
              onClick={onClose}
              title="close"
            >
              <Icon icon="close" color={'dark400'} />
            </Button>
          </Box>
          <Box paddingX={10} paddingTop={5} paddingBottom={10}>
            <Text variant="h1" as={'h1'} marginBottom={2}>
              {title}
            </Text>
            <Text marginBottom={5}>{description}</Text>

            {localData.map((category: any, index: any) => (
              <>
                {category.title && (
                  <Box marginBottom={2}>
                    <Text variant="h5" as={'h4'}>
                      {category.title}
                    </Text>
                  </Box>
                )}
                <Box marginBottom={4}>
                  {category.values.map((item: any, i: any) => {
                    if (!item.new) {
                      return (
                        <Box
                          key={i}
                          display="flex"
                          justifyContent={'spaceBetween'}
                          alignItems={'center'}
                          marginBottom={4}
                        >
                          <Box width="full">
                            <Input
                              label={item.label}
                              name={item.label}
                              value={item.value}
                              readOnly={false}
                              onChange={(e) => handleValueChange(e, index, i)}
                              type="number"
                              required={true}
                            />
                          </Box>
                          <Box
                            display={'flex'}
                            justifyContent={'flexStart'}
                            paddingRight={10}
                            paddingLeft={3}
                          >
                            <Button
                              circle={true}
                              colorScheme="light"
                              title="delete"
                              onClick={() =>
                                handleDelete(type, item.id, index, i)
                              }
                            >
                              <Icon icon="trash" type="outline" />
                            </Button>
                          </Box>
                        </Box>
                      )
                    }

                    const getNewLabel = (type: any): string | undefined => {
                      switch (type) {
                        case IncomeType.Salary:
                          return 'Name of employer'
                        case IncomeType.PerDiem:
                          return 'Name of allowance or benefit'
                        case IncomeType.Grants:
                          return 'Name of grant or subsidy'
                        default:
                          return undefined
                      }
                    }

                    const getNewValueLabel = (
                      type: any,
                    ): string | undefined => {
                      switch (type) {
                        case IncomeType.Salary:
                          return 'New income'
                        case IncomeType.PerDiem:
                          return 'New income'
                        case IncomeType.Grants:
                          return 'New grant amount'
                        default:
                          return undefined
                      }
                    }

                    return (
                      <Box
                        key={i}
                        display="flex"
                        justifyContent={'spaceBetween'}
                        alignItems={'center'}
                        marginBottom={4}
                      >
                        <>
                          <Box
                            background={'dark100'}
                            width="full"
                            padding={2}
                            marginBottom={2}
                          >
                            <Box
                              flexDirection={'row'}
                              display={'flex'}
                              justifyContent={'spaceBetween'}
                              alignItems={'center'}
                            >
                              <Text variant="h3" as={'h3'} marginBottom={2}>
                                Add new entry
                              </Text>
                              <Button
                                circle={true}
                                colorScheme="light"
                                title="delete"
                                onClick={() => {
                                  setLocalData(
                                    localData.filter(
                                      (_: any, idx: any) => idx === i,
                                    ),
                                  )
                                }}
                              >
                                <Icon icon="trash" type="outline" />
                              </Button>
                            </Box>

                            <Input
                              label={getNewLabel(type)}
                              name="New item"
                              value={item.label}
                              readOnly={false}
                              type="text"
                              onChange={(e) => handleLabelChange(e, index, i)}
                              required={true}
                              errorMessage="Make sure the field contains a string value"
                            />
                            <Box marginTop={2} />

                            <Input
                              label={getNewValueLabel(type)}
                              name="New value"
                              value={item.value}
                              type="number"
                              onChange={(e) => handleValueChange(e, index, i)}
                              required={true}
                              errorMessage="Make sure the field contains a numeric value"
                            />
                          </Box>
                        </>
                        <Box
                          display={'flex'}
                          justifyContent={'flexStart'}
                          paddingRight={6}
                          paddingLeft={3}
                        ></Box>
                      </Box>
                    )
                  })}
                </Box>
              </>
            ))}
            <Box marginBottom={8}>
              <Box marginBottom={4}>
                <Button
                  variant="ghost"
                  icon="add"
                  onClick={() => {
                    const updated = [...localData]
                    if (updated.length > 0) {
                      updated.push({
                        title:
                          type === IncomeType.Grants
                            ? 'New Grant Category'
                            : null,
                        values: [
                          {
                            label: ``,
                            value: null,
                            new: true,
                          },
                        ],
                      })
                      setLocalData(updated)
                    }
                  }}
                >
                  {t.buttons['addOtherInformation']}
                </Button>
              </Box>
              <Divider />
            </Box>
            <Box display="flex" justifyContent={'spaceBetween'} marginTop={5}>
              <Button variant="ghost" onClick={onClose}>
                {t.buttons['cancel']}
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  onConfirm().then(() => onClose());
                  

                }}                
                type='submit'>
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </ModalBase>
  )
}
