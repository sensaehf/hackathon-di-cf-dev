import React from 'react'
import Dashboard from '../../screens/Dashboard/Dashboard'
import { MainLayout } from '../../layouts/MainLayout'

const DashboardPage = () => {
  return <Dashboard></Dashboard>
}

DashboardPage.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
)

export default DashboardPage
