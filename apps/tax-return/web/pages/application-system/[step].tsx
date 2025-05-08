// pages/application/[step].tsx
import { useRouter } from 'next/router'
import { steps } from '../../components/Stepper/stepperConfig'
import {
  Box,
  GridContainer,
  GridRow,
  GridColumn,
  Section,
  Text,
  FormStepperV2,
} from '@island.is/island-ui/core'
import { AppLayout } from '../../layouts/AppLayout'
import { StepBox } from '../../components/Stepper/StepBox'
import { ReactElement } from 'react'

const StepPage = () => {
  const router = useRouter()
  const { step } = router.query

  if (!router.isReady) {
    return null
  }
  // Find the current step based on the URL
  const currentStepIndex = steps.findIndex((s) => s.id === step)

  // Redirect to the first step if the step is invalid
  if (currentStepIndex === -1) {
    if (typeof window !== 'undefined') {
      router.replace('/application-system/intro')
    }
    return null
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      router.push(`/application-system/${steps[currentStepIndex + 1].id}`)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      router.push(`/application-system/${steps[currentStepIndex - 1].id}`)
    }
  }

  const stepperNavItems: ReactElement[] = [
    <Section
      section={'Tax returns 2024'}
      isActive={
        steps[currentStepIndex].id === 'intro' ||
        steps[currentStepIndex].id === 'assets' ||
        steps[currentStepIndex].id === 'income' ||
        steps[currentStepIndex].id === 'debts'
      }
      isComplete={true}
      sectionIndex={0}
      subSections={[
        <Text
          variant="medium"
          key="sub0"
          fontWeight={
            steps[currentStepIndex].id === 'income' ? 'semiBold' : 'regular'
          }
        >
          Income
        </Text>,
        <Text
          variant="medium"
          key="sub0"
          fontWeight={
            steps[currentStepIndex].id === 'assets' ? 'semiBold' : 'regular'
          }
        >
          Assets
        </Text>,
        <Text
          variant="medium"
          key="sub0"
          fontWeight={
            steps[currentStepIndex].id === 'debts' ? 'semiBold' : 'regular'
          }
        >
          Debts and Interest Payment
        </Text>,
      ]}
    />,
    <Section
      section={'Summary'}
      sectionIndex={1}
      isActive={steps[currentStepIndex].id === 'summary'}
    />,
    <Section
      section={'Receipt'}
      sectionIndex={2}
      isActive={steps[currentStepIndex].id === 'receipt'}
    />,
  ]

  return (
    <Box background={'purple100'} height={'full'} style={{ height: '100vh' }}>
      <GridContainer>
        <GridRow>
          <GridColumn span={['12/12', '9/12']}>
            <Box background={'white'} marginX={2} marginY={5}>
              <StepBox
                title={
                  steps[currentStepIndex + 1] !== undefined
                    ? steps[currentStepIndex + 1].title
                    : ''
                }
                goBackToDashboard={() => router.push('/dashboard')}
                previousStep={handlePrevious}
                nextStep={handleNext}
                step={currentStepIndex}
              >
                {steps[currentStepIndex].component}
              </StepBox>
            </Box>
          </GridColumn>
          <GridColumn span={['12/12', '3/12']}>
            <Box marginTop={20}>
              <FormStepperV2 sections={stepperNavItems}></FormStepperV2>
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}

StepPage.getLayout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>

export default StepPage
