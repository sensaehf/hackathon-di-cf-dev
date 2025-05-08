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
  IncomeType,
} from '../../types/TaxReturnBoxProps'
import {
  PensionsGrantsSubsidies,
  PerDiemAndPerks,
  SalaryWorkPayments,
} from '../../graphql/schema'
import { useRouter } from 'next/router'

import { useRouter } from 'next/router'
import en from '../../public/locales/en/stepper.json'
import is from '../../public/locales/is/stepper.json'

const translations: any = { en, is }

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
  const { locale = 'en' } = useRouter()
  const t = translations[locale] || translations.en

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

  const router = useRouter()

  if (salaryData.loading || perDiemsData.loading || grantsData.loading) {
    return null
  }

  const salaries: SalaryWorkPayments[] =
    salaryData.data.findAllSalaryWorkPaymentsByTaxSubmission
  const perDiems: PerDiemAndPerks[] =
    perDiemsData.data.findAllPerDiemAndPerksByTaxSubmission
  const grants: PensionsGrantsSubsidies[] =
    grantsData.data.findAllPensionsGrantsSubsidiesByTaxSubmission

  console.log(salaries)

  const incomes: TaxReturnBoxProps[] = [
    {
      title: t.stepperTitles['salary'],
      description: t.stepperDescription['salary'],
      icon: 'card',
      subCategories: salaries
        ? salaries.map((item: any) => ({
            values: [
              {
                label: item.employerName,
                value: item.amount,
                id: item.id,
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
      type: IncomeType.Salary,
    },
    {
      title: t.stepperTitles['perDiems'],
      description: t.stepperDescription['salary'],
      icon: 'cash',
      subCategories: perDiems
        ? perDiems.map((item: any) => ({
            values: [
              {
                label: item.type,
                value: item.amount,
                id: item.id,
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
      type: IncomeType.PerDiem,
    },
    {
      title: t.stepperTitles['grants'],
      description: t.stepperDescription['salary'],
      icon: 'cash',
      subCategories: grants
        ? grants.map((item: any) => ({
            title: item.grantType,
            values: [
              {
                label: item.sourceName,
                value: item.amount,
                id: item.id,
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
      type: IncomeType.Grants,
    },
  ]

  const handleClose = (): void => {
    setShow(false)
    router.reload()
  }

  return (
    <>
      {' '}
      <Text variant="eyebrow">{t.headings['taxReturn']}</Text>
      <Text variant="h1" as={'h1'} paddingBottom={1}>
        {t.headings['income']}
      </Text>
      <Text variant="default">{t.descriptions['incomeDescription']}</Text>
      {incomes.map((income, index) => (
        <TaxReturnBox
          key={income.type}
          title={income.title}
          icon={income.icon}
          subCategories={income.subCategories}
          totalAmount={income.total}
          setShow={() => handleShow(index)}
        />
      ))}
      <TaxReturnModal
        isVisible={show}
        onClose={() => handleClose()}
        data={incomes[showIndex].subCategories}
        title={incomes[showIndex].title}
        description={incomes[showIndex].description}
        type={incomes[showIndex].type}
      ></TaxReturnModal>
    </>
  )
}
