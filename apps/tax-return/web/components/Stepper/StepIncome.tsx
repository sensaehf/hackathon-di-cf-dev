import {
  Box,
  Text,
  Link,
  Icon,
  Divider,
  Button,
} from '@island.is/island-ui/core'
import { TaxReturnBox } from '../TaxReturnBox/TaxReturnBox'
import { TaxReturnModal } from '../TaxReturnBox/TaxReturnModal'
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  TaxReturnBoxProps,
  SubCategory,
  Values,
} from '../../types/TaxReturnBoxProps'
import {
  PensionsGrantsSubsidies,
  PerDiemAndPerks,
  SalaryWorkPayments,
} from '../../graphql/schema'

// Salary
const GET_SALARY_WORK = gql`
  query GetAllSalaryWorkPaymentsByTaxSubmission($taxSubmissionId: Int!) {
    findAllSalaryWorkPaymentsByTaxSubmission(
      taxSubmissionId: $taxSubmissionId
    ) {
      id
      taxSubmissionId
      employerName
      amount
      currency
      year
    }
  }
`

//Per Diems
const GET_PER_DIEMS = gql`
  query GetAllPerDiemAndPerksByTaxSubmission($taxSubmissionId: Int!) {
    findAllPerDiemAndPerksByTaxSubmission(taxSubmissionId: $taxSubmissionId) {
      id
      taxSubmissionId
      type
      amount
      currency
    }
  }
`

// Pensions and Grants
const GET_GRANTS = gql`
  query GetAllPensionsGrantsSubsidiesByTaxSubmission($taxSubmissionId: Int!) {
    findAllPensionsGrantsSubsidiesByTaxSubmission(
      taxSubmissionId: $taxSubmissionId
    ) {
      id
      taxSubmissionId
      sourceName
      grantType
      amount
      currency
      year
    }
  }
`

export const StepIncome = () => {
  const [show, setShow] = useState(false)
  const [showIndex, setShowIndex] = useState(0)

  const handleShow = (index: number) => {
    setShow(true)
    setShowIndex(index)
  }

  const salaryData = useQuery(GET_SALARY_WORK, {
    variables: { taxSubmissionId: 1 },
  })

  const perDiemsData = useQuery(GET_PER_DIEMS, {
    variables: { taxSubmissionId: 1 },
  })

  const grantsData = useQuery(GET_GRANTS, {
    variables: { taxSubmissionId: 1 },
  })

  if (salaryData.loading || perDiemsData.loading || grantsData.loading) {
    return null
  }

  const salaries: SalaryWorkPayments[] =
    salaryData.data.findAllSalaryWorkPaymentsByTaxSubmission
  const perDiems: PerDiemAndPerks[] =
    perDiemsData.data.findAllPerDiemAndPerksByTaxSubmission
  const grants: PensionsGrantsSubsidies[] =
    grantsData.data.findAllPensionsGrantsSubsidiesByTaxSubmission

  console.log(perDiems)

  const incomes: TaxReturnBoxProps[] = [
    {
      title: 'Salary and Work-Related Payments',
      description:
        'If the number shown doesn’t match your payslips or income statements, you can adjust it. Make sure to enter the correct total before tax, based on what you earned during the year.',
      icon: 'card',
      subCategories: salaries
        ? salaries.map((item: any) => ({
            values: [
              {
                label: item.employerName,
                value: item.amount,
              },
            ],
          }))
        : [],
      total:
        salaries.length > 1
          ? salaries.reduce((total: number, y: SalaryWorkPayments) => {
              return total + y.amount
            }, 0)
          : salaries[0].amount,
    },
    {
      title: 'Allowances and benefits',
      description:
        'If the number shown doesn’t match your payslips or income statements, you can adjust it. Make sure to enter the correct total before tax, based on what you earned during the year.',
      icon: 'cash',
      subCategories: perDiems
        ? perDiems.map((item: any) => ({
            values: [
              {
                label: item.type,
                value: item.amount,
              },
            ],
          }))
        : [],
      total:
        perDiems.length > 1
          ? perDiems.reduce((total: number, y: PerDiemAndPerks) => {
              return total + y.amount
            }, 0)
          : perDiems[0].amount,
    },
    {
      title: 'Grants and Subsidies',
      description:
        'If the number shown doesn’t match your payslips or income statements, you can adjust it. Make sure to enter the correct total before tax, based on what you earned during the year.',
      icon: 'cash',
      subCategories: grants
        ? grants.map((item: any) => ({
            title: item.grantType,
            values: [
              {
                label: item.sourceName,
                value: item.amount,
              },
            ],
          }))
        : [],
      total:
        grants.length > 1
          ? grants.reduce((total: number, y: PensionsGrantsSubsidies) => {
              return total + y.amount
            }, 0)
          : grants[0].amount,
    },
  ]

  return (
    <>
      {' '}
      <Text variant="eyebrow">Tax return 2024</Text>
      <Text variant="h1" as={'h1'} paddingBottom={1}>
        Income for 2024
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
