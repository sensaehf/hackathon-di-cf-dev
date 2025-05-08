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
      title: 'Mortgage Interest - Residential Use',
      description:
        'If the number shown doesn’t match your payslips or income statements, you can adjust it. Make sure to enter the correct total before tax, based on what you earned during the year.',
      icon: 'trending',
      subCategories: mortgage
        ? mortgage.map((item: MortgageInterest) => ({
            title: item.lenderName,
            values: [
              {
                label: 'Total Annual Payments',
                value: item.totalAnnualPayments,
              },
              {
                label: 'Principal Repayment',
                value: item.principalRepayment,
              },
              {
                important: true,
                label: 'Interest',
                value: item.interestAmount,
              },
              {
                important: true,
                label: 'Outstanding Balance',
                value: item.outstandingBalance,
              },
            ],
          }))
        : [],
    },
    {
      title: 'Other Loans and Interest',
      description:
        'If the number shown doesn’t match your payslips or income statements, you can adjust it. Make sure to enter the correct total before tax, based on what you earned during the year.',
      icon: 'card',
      subCategories: reliabilites
        ? reliabilites.map((item: OtherReliabilities) => ({
            title: item.description,
            values: [
              {
                label: 'Interest',
                value: item.interestAmount,
              },
              {
                label: 'Balance',
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
      <Text variant="eyebrow">Tax return 2024</Text>
      <Text variant="h1" as={'h1'} paddingBottom={1}>
        Debts and Interest Expenses in 2024
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
