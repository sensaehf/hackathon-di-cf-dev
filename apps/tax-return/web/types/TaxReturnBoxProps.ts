import { Icon as IconType } from 'libs/island-ui/core/src/lib/IconRC/iconMap'

export enum IncomeType{
  Salary = 'Salary',
  PerDiem = 'PerDiem',
  Grants = 'Grants',
}


export interface TaxReturnBoxProps {
    title: string
    description: string
    icon: IconType
    subCategories: SubCategory[]
    total?: number
    totals?: number[]
    type?: IncomeType
  }
  
export interface SubCategory {
    title?: string
    values: Values[]
  }
  
export interface Values {
    important?: boolean
    label: string
    value: number
}