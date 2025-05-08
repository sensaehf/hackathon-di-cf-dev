import {
  Box,
  Button,
  Divider,
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

import { TaxSubmission } from '../../graphql/schema'

import { useQuery, gql } from '@apollo/client'

import { useRouter } from 'next/router'
import en from '../../public/locales/en/stepper.json'
import is from '../../public/locales/is/stepper.json'

const translations: any = { en, is }

// GraphQL Query
const FindAllTaxSubmissionsForUser = gql`
  query FindAllTaxSubmissionsForUser {
    findAllTaxSubmissionsForUser(personId: 1) {
      id
      personId
      taxYear
      createdAt
    }
  }
`

export const SummaryBox: React.FC = (props) => {
  const { data, loading, error } = useQuery<TaxSubmission[]>(
    FindAllTaxSubmissionsForUser,
  )

  const { locale = 'en' } = useRouter()
  const t = translations[locale] || translations.en

  return (
    <>
      <Box background={'blue100'} borderColor="blue200" marginY={3}>
        <GridContainer>
          <GridRow>
            <GridColumn span={'12/12'}>
              <Box padding={3}>
                <Text variant="h3" as="h2" marginBottom={1}>
                  {t.timeline['income']}
                </Text>
                <GridContainer>
                  <GridRow>
                    <GridColumn span={['12/12', '8/12']}>
                      <Box>
                        <Box
                          display="flex"
                          justifyContent={'spaceBetween'}
                          marginBottom={1}
                        >
                          <Text>{t.stepperTitles['salary']}</Text>
                          <Text>102,600,000</Text>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent={'spaceBetween'}
                          marginBottom={1}
                        >
                          <Text>{t.stepperTitles['perDiems']}</Text>
                          <Text>120,000</Text>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent={'spaceBetween'}
                          marginBottom={1}
                        >
                          <Text>{t.stepperTitles['grants']}</Text>
                          <Text>205,000</Text>
                        </Box>
                        <Divider />
                        <Box
                          display="flex"
                          justifyContent={'spaceBetween'}
                          paddingTop={1}
                        >
                          <Text>{t.summary['totalIncome']}</Text>
                          <Text>205,000</Text>
                        </Box>
                      </Box>
                    </GridColumn>
                  </GridRow>
                </GridContainer>
              </Box>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn span={'12/12'}>
              <Box padding={3}>
                <Text variant="h3" as="h2" marginBottom={1}>
                  {t.timeline['Assets']}
                </Text>
                <GridContainer>
                  <GridRow>
                    <GridColumn span={['12/12', '8/12']}>
                      <Box>
                        <Box
                          display="flex"
                          justifyContent={'spaceBetween'}
                          marginBottom={1}
                        >
                          <Text>{t.stepperTitles['realEstate']}</Text>
                          <Text>52,000,000</Text>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent={'spaceBetween'}
                          marginBottom={1}
                        >
                          <Text>{t.stepperTitles['Vehicles']}</Text>
                          <Text>35,300,000</Text>
                        </Box>
                        <Divider />
                        <Box
                          display="flex"
                          justifyContent={'spaceBetween'}
                          paddingTop={1}
                        >
                          <Text>{t.summary['totalAssets']}</Text>
                          <Text>205,000</Text>
                        </Box>
                      </Box>
                    </GridColumn>
                  </GridRow>
                </GridContainer>
              </Box>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn span={'12/12'}>
              <Box padding={3}>
                <Text variant="h3" as="h2" marginBottom={1}>
                  {t.timeline['debts']}
                </Text>
                <Box display="flex" justifyContent="spaceBetween">
                  {/* First Column */}
                  <Box paddingTop={4} width="full">
                    {/* Loop this from DB */}
                    <Text marginBottom={1}>Domestic Real Estate</Text>
                    <Text marginBottom={1}>44469 88XX XXXX 4567</Text>
                  </Box>

                  {/* Second Column */}
                  <Box textAlign="right" width="full">
                    <Text fontWeight="semiBold" marginBottom={1}>
                      Interests
                    </Text>
                    {/* Start loop here */}
                    <Text marginBottom={1}>35,300,000</Text>
                    <Text marginBottom={1}>35,300,000</Text>
                  </Box>

                  {/* Third Column */}
                  <Box textAlign="right" paddingLeft={2} width="full">
                    <Text fontWeight="semiBold" marginBottom={1}>
                      Balance
                    </Text>
                    {/* Start loop here */}
                    <Text marginBottom={1}>35,300,000</Text>
                    <Text marginBottom={1}>35,300,000</Text>
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="spaceBetween" marginTop={1}>
                  {/* First Column */}
                  <Box width="full">
                    <Text>TOTAL</Text>
                  </Box>

                  {/* Second Column */}
                  <Box textAlign="right" width="full">
                    <Text>35,300,000</Text>
                  </Box>

                  {/* Third Column */}
                  <Box textAlign="right" paddingLeft={2} width="full">
                    <Text>35,300,000</Text>
                  </Box>
                </Box>
              </Box>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn span={'12/12'}>
              <Box padding={3}>
                <Text variant="h3" as="h2" marginBottom={1}>
                  Net Wealth
                </Text>
                <GridContainer>
                  <GridRow>
                    <GridColumn span={['12/12', '8/12']}>
                      <Box>
                        <Divider />
                        <Box
                          display="flex"
                          justifyContent={'spaceBetween'}
                          paddingTop={1}
                        >
                          <Text>Wealth after debt</Text>
                          <Text>158,303,790</Text>
                        </Box>
                      </Box>
                    </GridColumn>
                  </GridRow>
                </GridContainer>
              </Box>
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn span={'12/12'}>
              <Box padding={3}>
                <Text variant="h3" as="h2" marginBottom={1}>
                  Tax Calculation
                </Text>
                <GridContainer>
                  <GridRow>
                    <GridColumn span={['12/12', '8/12']}>
                      <Box>
                        <Divider />
                        <Box
                          display="flex"
                          justifyContent={'spaceBetween'}
                          paddingY={1}
                        >
                          <Text>Provisionally calculated tax and duties</Text>
                          <Text>-----</Text>
                        </Box>
                      </Box>
                      <Box>
                        <Divider />
                        <Box
                          display="flex"
                          justifyContent={'spaceBetween'}
                          paddingY={1}
                        >
                          <Text>Estimated tax for 2024</Text>
                          <Text>-----</Text>
                        </Box>
                      </Box>
                    </GridColumn>
                  </GridRow>
                </GridContainer>
              </Box>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </Box>
    </>
  )
}
