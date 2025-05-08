import { Box, Button, Input, Logo, Text } from '@island.is/island-ui/core'
import { useRouter } from 'next/router'

import en from '../../public/locales/en/login.json'
import is from '../../public/locales/is/login.json'

const translations: any = { en, is }

const Login = () => {
  const { locale = 'en', push } = useRouter()

  const t = translations[locale] || translations.en
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Logo iconOnly={true} />
      <Text color="blue400" fontWeight="semiBold">
        {t.title}
      </Text>
      <br></br>
      <Input name="tel" label={t.label} type="tel" placeholder="000-000" />
      <br></br>
      <Button onClick={() => push('/application-system/intro')}>
        {t.buttonTitle}
      </Button>
    </Box>
  )
}

export default Login
