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

interface TaxReturnBoxProps {
  title: string
  icon: IconType
  subCategories: SubCategory[]
}

interface SubCategory {
  title?: string
  values: Values[]
}

interface Values {
  label: string
  value: string
}

export const StepIncome = () => {
  const [show, setShow] = useState(false)
  const incomes: TaxReturnBoxProps[] = [
    {
      title: 'Salary and Work-Related Payments',
      icon: 'card',
      subCategories: [
        {
          title: 'Salary',
          values: [
            { label: 'Employer', value: 'Company A' },
            { label: 'Amount', value: '1.000.000 kr.' },
          ],
        },
        {
          title: 'Work-Related Payments',
          values: [
            { label: 'Employer', value: 'Company B' },
            { label: 'Amount', value: '500.000 kr.' },
          ],
        },
      ],
    },
    {
      title: 'Allowances and benefits',
      icon: 'cash',
      subCategories: [
        {
          title: 'Child Allowance',
          values: [
            { label: 'Amount', value: '100.000 kr.' },
            { label: 'Taxable', value: 'Yes' },
          ],
        },
        {
          title: 'Unemployment Benefits',
          values: [
            { label: 'Amount', value: '200.000 kr.' },
            { label: 'Taxable', value: 'No' },
          ],
        },
      ],
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
          totalAmount="1.500.000 kr."
          setShow={() => setShow(true)}
        />
      ))}
      <TaxReturnModal
        isVisible={show}
        onClose={() => setShow(false)}
      ></TaxReturnModal>
    </>
  )
}
