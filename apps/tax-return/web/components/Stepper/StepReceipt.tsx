import {
  Box,
  Text,
  Link,
  Icon,
  Divider,
  Button,
} from '@island.is/island-ui/core'

import { useRouter } from 'next/router'
import en from '../../public/locales/en/stepper.json'
import is from '../../public/locales/is/stepper.json'

const translations: any = { en, is }

export const StepReceipt = () => {
  const { locale = 'en' } = useRouter()

  const t = translations[locale] || translations.en

  return (
    <>
      <Text variant="eyebrow">{t.headings['taxReturn']}</Text>
      <Text variant="h1" as={'h1'} paddingBottom={1}>
        {t.receipt['title']}
      </Text>
      <Text paddingBottom={2}>{t.receipt['description']}</Text>
      <Text paddingBottom={2}>{t.receipt['copyDescription']}</Text>
    </>
  )
}
