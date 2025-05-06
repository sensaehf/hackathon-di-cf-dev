import { AppProps } from 'next/app'
import './styles.css'

import en from '../public/locales/en/common.json'
import is from '../public/locales/is/common.json'
import mockUser from '../mock/mockUser.json'
import React from 'react'

const translations: any = { en, is }

type CustomAppProps = AppProps & {
  Component: AppProps['Component'] & {
    getLayout?: (page: React.ReactNode) => React.ReactNode
  }
}

function App({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export default App
