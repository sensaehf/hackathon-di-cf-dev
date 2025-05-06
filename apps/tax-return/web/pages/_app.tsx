import { AppProps } from 'next/app'
import Head from 'next/head'
import './styles.css'
import {
  ActionCard,
  Box,
  Button,
  Footer,
  GridContainer,
  Header,
  Menu,
} from '@island.is/island-ui/core'
import { useRouter } from 'next/router'

import en from '../public/locales/en/common.json'
import is from '../public/locales/is/common.json'

const translations: any = { en, is }

function CustomApp({ Component, pageProps }: AppProps) {
  const { locale = 'en', push, pathname, query, asPath } = useRouter()

  const t = translations[locale] || translations.en

  const thisLocale = locale === 'en' ? 'IS' : 'EN'
  const headerItems = () => (
    <>
      <Button variant="utility" icon={'person'}>
        {t.myPages}
      </Button>
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
      <Button variant="utility" icon={'menu'}>
        {t.menu}
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
            <Header headerItems={headerItems()} />
          </GridContainer>
        </header>
        <Component {...pageProps} />
        <Footer />
      </>
    </>
  )
}

export default CustomApp
