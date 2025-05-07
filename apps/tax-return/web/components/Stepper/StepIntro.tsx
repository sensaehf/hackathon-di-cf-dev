import {
  Box,
  Text,
  Link,
  Icon,
  Divider,
  Button,
} from '@island.is/island-ui/core'

export const StepIntro = () => {
  return (
    <>
      {' '}
      <Text variant="h1" as={'h1'} paddingBottom={1}>
        Tax return 2024
      </Text>
      <Text paddingBottom={2}>
        Here you’ll find an overview of your income, assets and liabilities from
        last year.
      </Text>
      <Text paddingBottom={2}>
        Most of the information has already been filled in for you. Your task is
        to review the details and make any necessary changes before submitting.
      </Text>
      <Text paddingBottom={2}>
        You can save your progress and return later. Your information is stored
        securely, and nothing is sent until you choose to submit.
      </Text>
      <Button variant="text">Learn more here</Button>
    </>
  )
}
