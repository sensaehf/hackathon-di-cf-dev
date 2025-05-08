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

import { useRouter } from 'next/router'
import en from '../../public/locales/en/stepper.json'
import is from '../../public/locales/is/stepper.json'

const translations: any = { en, is }

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
  const { locale = 'en' } = useRouter()
  const t = translations[locale] || translations.en
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
      title: t.stepperTitles['realEstate'],
      description: t.stepperDescription['realEstate'],
      icon: 'home',
      subCategories: realEstate
        ? realEstate.map((item: any) => ({
            title: item.address,
            values: [
              {
                label: t.valueLabels['realEstateAssessment'],
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
      title: t.stepperTitles['vehicles'],
      description: t.stepperDescription['vehicles'],
      icon: 'car',
      subCategories: vehicles
        ? vehicles.map((item: any) => ({
            title: item.id,
            values: [
              {
                label: t.valueLabels['vehiclesPurchaseYear'],
                value: item.purchaseYear,
              },
              {
                label: t.valueLabels['vehiclesPurchasePrice'],
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
      <Text variant="eyebrow">{t.headings['taxReturn']}</Text>
      <Text variant="h1" as={'h1'} paddingBottom={1}>
        {t.headings['assets']}
      </Text>
      <Text variant="default">{t.descriptions['assetsDescription']}</Text>
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
