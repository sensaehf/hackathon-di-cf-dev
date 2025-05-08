// pages/application/[step].tsx
import { useRouter } from 'next/router'
import { getSteps } from '../../components/Stepper/stepperConfig'
import {
  Box,
  GridContainer,
  GridRow,
  GridColumn,
  Section,
  Text,
  FormStepperV2,
  Hidden,
} from '@island.is/island-ui/core'
import { AppLayout } from '../../layouts/AppLayout'
import { StepBox } from '../../components/Stepper/StepBox'
import { ReactElement } from 'react'

const StepPage = () => {
  const router = useRouter()

  const steps = getSteps(router.locale)

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
      section={steps[0].title}
      isActive={
        steps[currentStepIndex].id === 'intro' ||
        steps[currentStepIndex].id === 'assets' ||
        steps[currentStepIndex].id === 'income' ||
        steps[currentStepIndex].id === 'debts'
      }
      isComplete={currentStepIndex > 3}
      sectionIndex={0}
      subSections={[
        <Text
          variant="medium"
          key="sub0"
          fontWeight={
            steps[currentStepIndex].id === 'income' ? 'semiBold' : 'regular'
          }
        >
          {steps[1].title}
        </Text>,
        <Text
          variant="medium"
          key="sub0"
          fontWeight={
            steps[currentStepIndex].id === 'assets' ? 'semiBold' : 'regular'
          }
        >
          {steps[2].title}
        </Text>,
        <Text
          variant="medium"
          key="sub0"
          fontWeight={
            steps[currentStepIndex].id === 'debts' ? 'semiBold' : 'regular'
          }
        >
          {steps[3].title}
        </Text>,
      ]}
    />,
    <Section
      section={steps[4].title}
      sectionIndex={1}
      isActive={steps[currentStepIndex].id === 'summary'}
      isComplete={currentStepIndex > 4}
    />,
    <Section
      section={steps[5].title}
      sectionIndex={2}
      isActive={steps[currentStepIndex].id === 'receipt'}
    />,
  ]

  return (
    <Box background={'purple100'} style={{ minHeight: '100vh' }}>
      <Hidden above={'sm'}>
        <Box marginTop={10}>
          <FormStepperV2 sections={stepperNavItems}></FormStepperV2>
        </Box>
      </Hidden>
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
            <Hidden below={'sm'}>
              <Box marginTop={10}>
                <FormStepperV2 sections={stepperNavItems}></FormStepperV2>
              </Box>
            </Hidden>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}

StepPage.getLayout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>

export default StepPage
