import {
  Box,
  Text,
  Link,
  Icon,
  Divider,
  Button,
  DialogPrompt,
} from '@island.is/island-ui/core'

import { useRouter } from 'next/router'
import en from '../../public/locales/en/stepper.json'
import is from '../../public/locales/is/stepper.json'

const translations: any = { en, is }

interface StepProps {
  nextStep: () => void
  previousStep: () => void
  goBackToDashboard: () => void
  children?: React.ReactNode
  title: string
  step: number
}
export const StepBox: React.FC<StepProps> = ({
  previousStep,
  nextStep,

  children,
  title,
  step,
}) => {
  const { locale = 'en', push } = useRouter()

  const t = translations[locale] || translations.en
  return (
    <>
      <Box background={'white'} marginX={2} marginY={5}>
        <Box padding={5}>{children}</Box>
        <Divider></Divider>
        <Box padding={5} display={'flex'} columnGap={1}>
          {step > 0 && step < 5 && (
            <Box>
              <Button variant="ghost" onClick={previousStep}>
                {t.buttons['back']}
              </Button>
            </Box>
          )}
          <Box display={'flex'} columnGap={1} marginLeft={'auto'}>
            <Button variant="ghost" onClick={() => push('/application-system')}>
              {step === 5
                ? t.buttons['previousReturns']
                : t.buttons['continueLater']}
            </Button>
            {step === 4 && (
              <Button
                variant="primary"
                onClick={nextStep}
                icon="mail"
                iconType="outline"
              >
                {t.buttons['submitTaxReturn']}
              </Button>
            )}
            {step === 5 && (
              <Button
                variant="primary"
                onClick={nextStep}
                icon="mail"
                iconType="outline"
              >
                {t.buttons['downloadPDF']}
              </Button>
            )}
            {step >= 0 && step < 4 && (
              <Button variant="primary" onClick={nextStep} icon="arrowForward">
                {t.buttons['continueTo']} "{title}"
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}
