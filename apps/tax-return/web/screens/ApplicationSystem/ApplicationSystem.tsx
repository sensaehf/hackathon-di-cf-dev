import {
  Box,
  Button,
  Divider,
  FormStepper,
  FormStepperSection,
  FormStepperV2,
  GridColumn,
  GridContainer,
  GridRow,
  Icon,
  Link,
  Section,
  Text,
} from '@island.is/island-ui/core'
import { ReactElement, useState } from 'react'
import { StepBox } from '../../components/Stepper/StepBox'
import { StepIntro } from '../../components/Stepper/StepIntro'
import { StepIncome } from '../../components/Stepper/StepIncome'

interface StepProps {
  nextStep: (step: number) => void
  previousStep: (step: number) => void
  children?: React.ReactNode
}

const ApplicationSystem: React.FC<StepProps> = ({
  nextStep,
  previousStep,
  children,
}) => {
  const stepperNavItems: ReactElement[] = [
    <Section
      section={'Tax returns 2024'}
      isActive={true}
      sectionIndex={0}
      subSections={[
        <Text variant="medium" key="sub0">
          Income
        </Text>,
        <Text variant="medium" key="sub0">
          Assets
        </Text>,
        <Text variant="medium" key="sub0">
          Debts and Interest Payment
        </Text>,
      ]}
    />,
    <Section section={'Summary'} sectionIndex={1} />,
    <Section section={'Receipt'} sectionIndex={2} />,
  ]

  const stepperSections: ReactElement[] = [<StepIntro />, <StepIncome />]

  return (
    <Box background={'purple100'} height={'full'} style={{ height: '100vh' }}>
      <GridContainer>
        <GridRow>
          <GridColumn span={'9/12'}></GridColumn>
          <GridColumn span={'3/12'}>
            <Box marginTop={20}>
              <FormStepperV2 sections={stepperNavItems} />
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}

export default ApplicationSystem
