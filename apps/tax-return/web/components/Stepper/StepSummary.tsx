import {
  Box,
  Text,
  Link,
  Icon,
  Divider,
  Button,
} from '@island.is/island-ui/core'
import { SummaryBox } from '../Summary/SummaryBox'

import { useRouter } from 'next/router'
import en from '../../public/locales/en/stepper.json'
import is from '../../public/locales/is/stepper.json'

const translations: any = { en, is }

export const StepSummary = () => {
  const { locale = 'en' } = useRouter()
  const t = translations[locale] || translations.en

  return (
    <>
      {' '}
      <Text variant="eyebrow">{t.headings['taxReturn']}</Text>
      <Text variant="h1" as={'h1'} paddingBottom={1}>
        {t.headings['summary']}
      </Text>
      <Text paddingBottom={2}>{t.descriptions['summaryDescription']}</Text>
      <Text paddingBottom={2}>{t.descriptions['pleaseReviewDescription']}</Text>
      <Button variant="text">{t.buttons['taxErrors']}</Button>
      <SummaryBox />
    </>
  )
}
