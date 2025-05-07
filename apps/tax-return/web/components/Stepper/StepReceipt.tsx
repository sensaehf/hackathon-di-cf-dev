import {
  Box,
  Text,
  Link,
  Icon,
  Divider,
  Button,
} from '@island.is/island-ui/core'

export const StepReceipt = () => {
  return (
    <>
      <Text variant="eyebrow">Tax return 2024</Text>
      <Text variant="h1" as={'h1'} paddingBottom={1}>
        Your tax return has been submitted
      </Text>
      <Text paddingBottom={2}>
        Thank you. Your tax return has been received and will be reviewed by the
        Tax Administration.You will receive a tax assessment once your return
        has been processed.
      </Text>
      <Text paddingBottom={2}>
        A copy of your submitted return is available under My Pages. If you need
        to make changes, you can reopen your return until the submission
        deadline.
      </Text>
    </>
  )
}
