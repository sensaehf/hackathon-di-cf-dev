import React from 'react'
import { useRouter } from 'next/router'
import {
  Header,
  Box,
  Divider,
  Page,
  Link,
  Button,
} from '@island.is/island-ui/core'

import en from '../public/locales/en/common.json'
import is from '../public/locales/is/common.json'

const translations: any = { en, is }

const Home = () => {
  const { locale = 'en', push, pathname, query, asPath } = useRouter()

  const thisLocale = locale === 'en' ? 'IS' : 'EN'
  const headerItems = () => (
    <>
      <Button
        onClick={() =>
          push({ pathname, query }, asPath, {
            locale: `${locale.toLowerCase() === 'en' ? 'is' : 'en'}`,
          })
        }
      >
        {thisLocale}
      </Button>
    </>
  )
  const t = translations[locale] || translations.en
  return (
    <div>
      <Page>
        <Box padding="containerGutter">
          <Header headerItems={headerItems()} />
        </Box>
        <Box padding="containerGutter">
          <h2>{t.welcome}</h2>
        </Box>
      </Page>
    </div>
  )
}

export default Home
