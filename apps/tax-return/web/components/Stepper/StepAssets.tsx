import {
  Box,
  Text,
  Link,
  Icon,
  Divider,
  Button,
} from '@island.is/island-ui/core'
import { TaxReturnBox } from '../TaxReturnBox/TaxReturnBox'
import { Icon as IconType } from 'libs/island-ui/core/src/lib/IconRC/iconMap'
import { TaxReturnModal } from '../TaxReturnBox/TaxReturnModal'
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  TaxReturnBoxProps,
  SubCategory,
  Values,
} from '../../types/TaxReturnBoxProps'
import { label } from 'libs/island-ui/core/src/lib/Input/Input.mixins'
import { RealEstate, Vehicle } from '../../graphql/schema'

// Real estate
const GET_REAL_ESTATE = gql`
  query GetAllRealEstatesByTaxSubmission($taxSubmissionId: Int!) {
    findAllRealEstatesByTaxSubmission(taxSubmissionId: $taxSubmissionId) {
      id
      taxSubmissionId
      address
      assessedValue
      currency
    }
  }
`

// Vehicles
const GET_VEHICLES = gql`
  query FindAllVehiclesByTaxSubmission($taxSubmissionId: Int!) {
    findAllVehiclesByTaxSubmission(taxSubmissionId: $taxSubmissionId) {
      id
      taxSubmissionId
      purchaseYear
      purchasePrice
      currency
    }
  }
`

export const StepAssets = () => {
  const [show, setShow] = useState(false)
  const [showIndex, setShowIndex] = useState(0)

  const handleShow = (index: number) => {
    setShow(true)
    setShowIndex(index)
  }

  const vehiclesData = useQuery(GET_VEHICLES, {
    variables: { taxSubmissionId: 1 },
  })

  const realEstateData = useQuery(GET_REAL_ESTATE, {
    variables: { taxSubmissionId: 1 },
  })

  if (vehiclesData.loading || realEstateData.loading) {
    return null
  }

  const vehicles: Vehicle[] = vehiclesData.data.findAllVehiclesByTaxSubmission
  const realEstate: RealEstate[] =
    realEstateData.data.findAllRealEstatesByTaxSubmission

  const incomes: TaxReturnBoxProps[] = [
    {
      title: 'Domestic Real Estate',
      description:
        'If the number shown doesn’t match your payslips or income statements, you can adjust it. Make sure to enter the correct total before tax, based on what you earned during the year.',
      icon: 'home',
      subCategories: realEstate
        ? realEstate.map((item: any) => ({
            title: item.address,
            values: [
              {
                label: 'Real estate assesement value',
                value: item.assessedValue,
              },
            ],
          }))
        : [],
      total:
        realEstate.length > 1
          ? realEstate.reduce((total: number, item: RealEstate) => {
              return total + item.assessedValue
            }, 0)
          : realEstate[0].assessedValue,
    },
    {
      title: 'Vehicles',
      description:
        'If the number shown doesn’t match your payslips or income statements, you can adjust it. Make sure to enter the correct total before tax, based on what you earned during the year.',
      icon: 'car',
      subCategories: vehicles
        ? vehicles.map((item: any) => ({
            title: item.id,
            values: [
              {
                label: 'Purchase year:',
                value: item.purchaseYear,
              },
              {
                label: 'Purchase price:',
                value: item.purchasePrice,
              },
            ],
          }))
        : [],
      total:
        vehicles.length > 1
          ? vehicles.reduce((total: number, item: Vehicle) => {
              return total + item.purchasePrice
            }, 0)
          : vehicles[0].purchasePrice,
    },
  ]

  return (
    <>
      {' '}
      <Text variant="eyebrow">Tax return 2024</Text>
      <Text variant="h1" as={'h1'} paddingBottom={1}>
        Assets in 2024
      </Text>
      <Text variant="default">
        This section shows the income you received last year — for example,
        wages, pensions or other taxable payments.
      </Text>
      {incomes.map((income, index) => (
        <TaxReturnBox
          title={income.title}
          icon={income.icon}
          subCategories={income.subCategories}
          totalAmount={income.total}
          setShow={() => handleShow(index)}
        />
      ))}
      <TaxReturnModal
        isVisible={show}
        onClose={() => setShow(false)}
        data={incomes[showIndex].subCategories}
        title={incomes[showIndex].title}
        description={incomes[showIndex].description}
      ></TaxReturnModal>
    </>
  )
}
