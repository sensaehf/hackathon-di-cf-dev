import Login from '../../screens/Login/Login'

import { AuthLayout } from '../../layouts/AuthLayout'

const LoginPage = () => {
  return <Login />
}

LoginPage.getLayout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>

export default LoginPage
