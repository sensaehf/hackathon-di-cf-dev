import {
  Box,
  Text,
  Link,
  Icon,
  Divider,
  Button,
  DialogPrompt,
} from '@island.is/island-ui/core'

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
  return (
    <>
      <Box background={'white'} marginX={2} marginY={5}>
        <Box padding={5}>{children}</Box>
        <Divider></Divider>
        <Box padding={5} display={'flex'} columnGap={1}>
          {step > 0 && (
            <Box>
              <Button variant="ghost" onClick={previousStep}>
                Back
              </Button>
            </Box>
          )}
          <Box display={'flex'} columnGap={1} marginLeft={'auto'}>
            <Button variant="ghost">Continue later</Button>
            {step === 4 && (
              <Button
                variant="primary"
                onClick={nextStep}
                icon="mail"
                iconType="outline"
              >
                Submit tax return
              </Button>
            )}
            {step === 5 && (
              <Button
                variant="primary"
                onClick={nextStep}
                icon="mail"
                iconType="outline"
              >
                Download PDF
              </Button>
            )}
            {step >= 0 && step < 4 && (
              <Button variant="primary" onClick={nextStep} icon="arrowForward">
                Continue to "{title}"
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}
