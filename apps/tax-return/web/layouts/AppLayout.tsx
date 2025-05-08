import React from 'react'
import Head from 'next/head'
import {
  Button,
  Footer,
  GridContainer,
  Header,
} from '@island.is/island-ui/core'
import { useRouter } from 'next/router'

import en from '../public/locales/en/common.json'
import is from '../public/locales/is/common.json'
import mockUser from '../mock/mockUser.json'

const translations: any = { en, is }

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { locale = 'en', push, pathname, query, asPath } = useRouter()

  const t = translations[locale] || translations.en

  const thisLocale = locale === 'en' ? 'IS' : 'EN'
  const headerItems = () => (
    <>
      <Button
        variant="utility"
        onClick={() =>
          push({ pathname, query }, asPath, {
            locale: `${locale.toLowerCase() === 'en' ? 'is' : 'en'}`,
          })
        }
      >
        {thisLocale}
      </Button>
      <Button variant="utility" icon={'chevronDown'}>
        {mockUser.firstName} {mockUser.lastName}
      </Button>
    </>
  )

  return (
    <>
      <Head>
        <title>Island.is - Tax returns</title>
      </Head>
      <>
        <header>
          <GridContainer>
            <Header
              info={{
                title: 'Skatturinn',
                description: t.appDescription,
              }}
              headerItems={headerItems()}
            />
          </GridContainer>
        </header>
        {children}
      </>
    </>
  )
}
