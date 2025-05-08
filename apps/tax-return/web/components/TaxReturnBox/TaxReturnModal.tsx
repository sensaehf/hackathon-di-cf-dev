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

interface Modal {
  isVisible: boolean
  onClose: () => void
  data: SubCategory[]
  title: string
  description: string
}


interface SubCategory {
  title?: string
  values: Values[]
}

interface Values {
  label: string
  value: number
  new?: boolean
}

export const TaxReturnModal: React.FC<Modal> = ({
  isVisible,
  onClose,
  data,
  title,
  description,
  type
}) => {
  const [localData, setLocalData] = useState(() => JSON.parse(JSON.stringify(data)))

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, categoryIdx: number, itemIdx: number) => {
    const updatedData = [...localData]
    updatedData[categoryIdx].values[itemIdx].value = Number(e.target.value)
    setLocalData(updatedData)
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, categoryIdx: number, itemIdx: number) => {
    const updatedData = [...localData]
    updatedData[categoryIdx].values[itemIdx].label = e.target.value
    setLocalData(updatedData)
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

            {localData.map((category, index) => (
              <>
                {category.title && (
                  <Box marginBottom={2}>
                    <Text variant="h5" as={'h4'}>
                      {category.title}
                    </Text>
                  </Box>
                )}
                <Box marginBottom={4}>
                  {category.values.map((item, i) => {
                    return (
                      <Box
                        key={i}
                        display="flex"
                        justifyContent={'spaceBetween'}
                        alignItems={'center'}
                        marginBottom={4}
                      >
                        <Box width="full">
                          {!item.new &&
                            <Input
                              label={item.label}
                              name={item.label}
                              value={item.value}
                              readOnly={false}
                              onChange={(e) => handleValueChange(e, index, i)}
                              type="number"
                            />
                            ||
                            <>
                              <Box display={'flex'} columnGap={1} marginLeft={'auto'}>
                                <Input
                                  label="New item"
                                  name='New item'
                                  value={item.label}
                                  readOnly={false}
                                  type="text"
                                  onChange={(e) => handleLabelChange(e, index, i)}                                  
                                />
                           
                                <Input
                                  label="New value"
                                  name='New value'
                                  value={item.value}
                                  type="number"
                                  onChange={(e) => handleValueChange(e, index, i)}
                                />
                              </Box>
                            </>}
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
                          >
                            <Icon icon="trash" type="outline" />
                          </Button>
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              </>
            ))}
            <Box marginBottom={8}>
              <Box marginBottom={4}>
                <Button variant="ghost" icon="add"
                  onClick={() => {
                    const updated = [...localData]
                    if (updated.length > 0) {
                      updated.push(
                        {
                          title: type === IncomeType.Grants ? 'New Grant Category' : null,
                          values: [
                            {
                              label: ``,
                              value: null,
                              new: true,
                            }]
                        })
                      setLocalData(updated)
                    }
                  }}
                >
                  Add other information
                </Button>
              </Box>
              <Divider />
            </Box>
            <Box display="flex" justifyContent={'spaceBetween'} marginTop={5}>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary">Confirm</Button>
            </Box>
          </Box>
        </Box>
      </div>
    </ModalBase>
  )
}
