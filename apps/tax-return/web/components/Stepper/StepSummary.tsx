import {
  Box,
  Text,
  Link,
  Icon,
  Divider,
  Button,
} from '@island.is/island-ui/core'
import { SummaryBox } from '../Summary/SummaryBox'

export const StepSummary = () => {
  return (
    <>
      {' '}
      <Text variant="eyebrow">Tax return 2024</Text>
      <Text variant="h1" as={'h1'} paddingBottom={1}>
        Summary
      </Text>
      <Text paddingBottom={2}>
        This page shows the information that has been pre-filled by the Tax
        Administration, along with any updates you've made.
      </Text>
      <Text paddingBottom={2}>
        Please review the details before you submit your return.
      </Text>
      <Button variant="text">Check my Tax Return for errors</Button>
      <SummaryBox />
    </>
  )
}
