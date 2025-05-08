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
import {
  TaxReturnBoxProps,
  SubCategory,
  Values,
} from '../../types/TaxReturnBoxProps'
import { gql, useQuery } from '@apollo/client'
import { MortgageInterest, OtherReliabilities } from '../../graphql/schema'

import { useRouter } from 'next/router'
import en from '../../public/locales/en/stepper.json'
import is from '../../public/locales/is/stepper.json'

const translations: any = { en, is }

// Debts and Interest
const GET_MORTGAGE = gql`
  query GetAllMortgageInterestsByTaxSubmission($taxSubmissionId: Int!) {
    findAllMortgageInterestsByTaxSubmission(taxSubmissionId: $taxSubmissionId) {
      id
      taxSubmissionId
      lenderName
      type
      startDate
      termYears
      purchaseYear
      totalAnnualPayments
      principalRepayment
      interestAmount
      outstandingBalance
      year
      currency
    }
  }
`

const GET_RELIABLITIES = gql`
  query GetAllOtherReliabilitiesByTaxSubmission($taxSubmissionId: Int!) {
    findAllOtherReliabilitiesByTaxSubmission(
      taxSubmissionId: $taxSubmissionId
    ) {
      id
      taxSubmissionId
      description
      interestAmount
      balance
      year
      currency
    }
  }
`

export const StepDebts = () => {
  const { locale = 'en' } = useRouter()
  const t = translations[locale] || translations.en

  const [show, setShow] = useState(false)
  const [showIndex, setShowIndex] = useState(0)

  const handleShow = (index: number) => {
    setShow(true)
    setShowIndex(index)
  }

  const mortgageData = useQuery(GET_MORTGAGE, {
    variables: { taxSubmissionId: 1 },
  })

  const reliabilitesData = useQuery(GET_RELIABLITIES, {
    variables: { taxSubmissionId: 1 },
  })

  if (mortgageData.loading || reliabilitesData.loading) {
    return null
  }

  const mortgage: MortgageInterest[] =
    mortgageData.data.findAllMortgageInterestsByTaxSubmission
  const reliabilites: OtherReliabilities[] =
    reliabilitesData.data.findAllOtherReliabilitiesByTaxSubmission

  const incomes: TaxReturnBoxProps[] = [
    {
      title: t.stepperTitles['mortgage'],
      description: t.stepperDescription['mortgage'],
      icon: 'trending',
      subCategories: mortgage
        ? mortgage.map((item: MortgageInterest) => ({
            title: item.lenderName,
            values: [
              {
                label: t.valueLabels['totalAnnualPayments'],
                value: item.totalAnnualPayments,
              },
              {
                label: t.valueLabels['principalRepayments'],
                value: item.principalRepayment,
              },
              {
                important: true,
                label: t.valueLabels['interest'],
                value: item.interestAmount,
              },
              {
                important: true,
                label: t.valueLabels['outstandingBalance'],
                value: item.outstandingBalance,
              },
            ],
          }))
        : [],
    },
    {
      title: t.stepperTitles['otherLoans'],
      description: t.stepperDescription['otherLoans'],
      icon: 'card',
      subCategories: reliabilites
        ? reliabilites.map((item: OtherReliabilities) => ({
            title: item.description,
            values: [
              {
                label: t.valueLabels['interest'],
                value: item.interestAmount,
              },
              {
                label: t.valueLabels['balance'],
                value: item.balance,
              },
            ],
          }))
        : [],
      totals: [
        reliabilites.length > 1
          ? reliabilites.reduce((total: number, y: OtherReliabilities) => {
              return total + y.interestAmount
            }, 0)
          : reliabilites[0].interestAmount,
        reliabilites.length > 1
          ? reliabilites.reduce((total: number, y: OtherReliabilities) => {
              return total + y.balance
            }, 0)
          : reliabilites[0].balance,
      ],
    },
  ]

  return (
    <>
      {' '}
      <Text variant="eyebrow">{t.headings['taxreturn']}</Text>
      <Text variant="h1" as={'h1'} paddingBottom={1}>
        {t.headings['debts']}
      </Text>
      <Text variant="default">{t.descriptions['debtsDescription']}</Text>
      {incomes.map((income, index) => (
        <TaxReturnBox
          title={income.title}
          icon={income.icon}
          subCategories={income.subCategories}
          totalAmount={income.total}
          setShow={() => handleShow(index)}
          totals={income.totals}
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
