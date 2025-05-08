import {
  Box,
  Button,
  GridColumn,
  GridContainer,
  GridRow,
  Icon,
  Link,
  LinkV2,
  Text,
  Tooltip,
} from '@island.is/island-ui/core'
import { Icon as IconType } from 'libs/island-ui/core/src/lib/IconRC/iconMap'

interface TaxReturnBoxProps {
  title: string
  icon: IconType
  subCategories: SubCategory[]
  totalAmount?: number
  totals?: number[]
  setShow: () => void
  tooltip?: string
}

interface SubCategory {
  title?: string
  values: Values[]
}

interface Values {
  important?: boolean
  label: string
  value: number
}

export const TaxReturnBox: React.FC<TaxReturnBoxProps> = (props) => {
  return (
    <>
      <Box background={'blue100'} borderColor="blue200" marginY={3}>
        <GridContainer>
          <GridRow>
            <GridColumn span={'8/12'}>
              <Box padding={3}>
                <Box
                  display="flex"
                  columnGap={2}
                  marginBottom={3}
                  alignItems={'center'}
                >
                  <Icon icon={props.icon} size="large" type="outline"></Icon>
                  <Text variant="h3" as={'h2'}>
                    {props.title}{' '}
                    <Tooltip text={props.tooltip} color="blue400" />
                  </Text>
                </Box>
                {props.subCategories.map((subCategory, index) => (
                  <>
                    {subCategory.title && (
                      <Box marginTop={2} paddingX={1}>
                        <Text variant="h4" as={'h3'}>
                          {subCategory.title}
                        </Text>
                      </Box>
                    )}
                    {subCategory.values.map((value, key) => (
                      <>
                        <Box
                          display="flex"
                          justifyContent={'spaceBetween'}
                          paddingX={1}
                          background={value.important ? 'blue200' : undefined}
                          marginY={value.important ? 1 : 0}
                        >
                          <Text>{value.label}</Text>
                          <Text>{value.value.toLocaleString()}</Text>
                        </Box>
                      </>
                    ))}
                  </>
                ))}
                {props.totalAmount && (
                  <Box
                    display="flex"
                    justifyContent={'spaceBetween'}
                    marginTop={3}
                    background="blue200"
                    paddingX={1}
                  >
                    <>
                      <Text>Amount we use in the tax calculation</Text>
                      <Text>{props.totalAmount.toLocaleString()}</Text>
                    </>
                  </Box>
                )}
                {props.totals && (
                  <>
                    {props.totals.map((total, index) => (
                      <Box
                        display="flex"
                        justifyContent={'spaceBetween'}
                        marginTop={1}
                        background="blue200"
                        paddingX={1}
                      >
                        <>
                          <Text>
                            {index === 0 ? 'Interest' : 'Outstanding Balance'}
                          </Text>
                          <Text>{total.toLocaleString()}</Text>
                        </>
                      </Box>
                    ))}
                  </>
                )}
              </Box>
            </GridColumn>
            <GridColumn span={'4/12'}>
              <Box display="flex" justifyContent={'flexEnd'} padding={1}>
                <Button
                  colorScheme={'light'}
                  icon="pencil"
                  onClick={props.setShow}
                >
                  Change
                </Button>
              </Box>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </Box>
    </>
  )
}
