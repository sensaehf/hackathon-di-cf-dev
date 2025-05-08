// stepperConfig.ts
import { StepIntro } from './StepIntro'
import { StepIncome } from './StepIncome'
import { StepAssets } from './StepAssets'
import { StepDebts } from './StepDebts'
import { StepSummary } from './StepSummary'
import { StepReceipt } from './StepReceipt'

import en from '../../public/locales/en/stepper.json'
import is from '../../public/locales/is/stepper.json'

const translations: any = { en, is }

export const getSteps = (locale: string = 'en') => {
  const t = translations[locale] || translations.en

  return [
    { id: 'intro', title: t.timeline['intro'], component: <StepIntro /> },
    { id: 'income', title: t.timeline['income'], component: <StepIncome /> },
    { id: 'assets', title: t.timeline['assets'], component: <StepAssets /> },
    { id: 'debts', title: t.timeline['debts'], component: <StepDebts /> },
    { id: 'summary', title: t.timeline['summary'], component: <StepSummary /> },
    { id: 'receipt', title: t.timeline['receipt'], component: <StepReceipt /> },
  ]
}
