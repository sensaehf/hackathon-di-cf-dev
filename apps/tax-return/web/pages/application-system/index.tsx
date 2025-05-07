import React from 'react'
import ApplicationSystem from '../../screens/ApplicationSystem/ApplicationSystem'
import { AppLayout } from '../../layouts/AppLayout'

const ApplicationSystemPage = () => {
  return <ApplicationSystem></ApplicationSystem>
}

ApplicationSystemPage.getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
)

export default ApplicationSystemPage
