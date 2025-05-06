import Landing from '../screens/Landing/Landing'
import { MainLayout } from '../layouts/MainLayout'

const LandingPage = () => {
  return <Landing></Landing>
}

LandingPage.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
)

export default LandingPage
