import React from 'react'
import { RootLayout } from './RootLayout'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootLayout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {children}
      </div>
    </RootLayout>
  )
}
