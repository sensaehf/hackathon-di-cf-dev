import { AppProps } from 'next/app'
import Head from 'next/head'
import './styles.css'
import { ApolloProvider } from '@apollo/client'
import client from '../lib/apollo-client'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to apps/cf-prep/webapp!</title>
      </Head>
      <main className="app">
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </main>
    </>
  )
}

export default CustomApp
