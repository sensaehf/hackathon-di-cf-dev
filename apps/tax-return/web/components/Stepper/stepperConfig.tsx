// stepperConfig.ts
import { StepIntro } from './StepIntro'
import { StepIncome } from './StepIncome'
import { StepAssets } from './StepAssets'
import { StepDebts } from './StepDebts'
import { StepSummary } from './StepSummary'
import { StepReceipt } from './StepReceipt'

export const steps = [
  { id: 'intro', title: 'Introduction', component: <StepIntro /> },
  { id: 'income', title: 'Income', component: <StepIncome /> },
  { id: 'assets', title: 'Assets', component: <StepAssets /> },
  {
    id: 'debts',
    title: 'Debts and Interest',
    component: <StepDebts />,
  },
  { id: 'summary', title: 'Summary', component: <StepSummary /> },
  { id: 'receipt', title: 'Receipt', component: <StepReceipt /> },
]
