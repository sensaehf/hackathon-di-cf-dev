import {
  Box,
  Button,
  CategoryCard,
  GridColumn,
  GridContainer,
  GridRow,
  Icon,
  NavigationItem,
  SkeletonLoader,
  Text,
} from '@island.is/island-ui/core'
import { theme } from '@island.is/island-ui/theme'
import cn from 'classnames'
import { useWindowSize } from 'react-use'
import * as styles from './Dashboard.css'

import en from '../../public/locales/en/dashboard.json'
import is from '../../public/locales/is/dashboard.json'
import { useRouter } from 'next/router'

const translations: any = { en, is }

interface mockNavRoot {
  name: string
  path: string
  enabled: boolean
  description: string
  icon: any
}

export const Dashboard = () => {
  const { locale = 'en', push } = useRouter()

  const t = translations[locale] || translations.en

  const mockNavRoots: mockNavRoot[] = [
    {
      path: 'application-system',
      name: t.applications['name'],
      description: t.applications['description'],
      icon: 'fileTrayFull',
      enabled: true,
    },
    {
      path: '/dashboard',
      name: t.accessControl['name'],
      description: t.accessControl['description'],
      icon: 'lockClosed',
      enabled: true,
    },
  ]
  const { width } = useWindowSize()
  const isMobile = width < theme.breakpoints.md
  const displayCards = () => {
    return mockNavRoots.map((navRoot, index) => (
      <GridColumn
        key={'text'}
        span={['12/12', '6/12']}
        paddingBottom={[1, 2, 3]}
      >
        <Box height="full" flexGrow={1} className={styles.svgOutline}>
          {navRoot.path && (
            <>
              {navRoot.enabled === false && (
                <Icon
                  color="blue600"
                  type="outline"
                  icon="lockClosed"
                  size="small"
                  className={styles.lock}
                />
              )}

              <CategoryCard
                autoStack
                hyphenate
                truncateHeading
                href={navRoot.path}
                headingVariant="h4"
                headingAs="h2"
                heading={navRoot.name}
                icon={
                  <Icon
                    color="blue600"
                    type="outline"
                    icon={navRoot.icon}
                    size="small"
                  ></Icon>
                }
                text={navRoot.description}
              />
            </>
          )}
        </Box>
      </GridColumn>
    ))
  }

  return (
    <Box paddingTop={[0, 0, 0, 4]} marginBottom={3}>
      <GridContainer>
        <GridRow data-testid="service-portal-dashboard">
          <GridColumn
            hiddenBelow="lg"
            span={['12/12', '12/12', '12/12', '5/12']}
          >
            <Box
              borderRadius="large"
              paddingY={3}
              paddingX={4}
              borderWidth="standard"
              borderColor="blue200"
            >
              <div>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  paddingBottom={30}
                  marginBottom={20}
                >
                  <Icon
                    icon="mail"
                    type="outline"
                    color="blue400"
                    size="medium"
                  />
                  <Box
                    paddingRight={1}
                    display="flex"
                    alignItems="center"
                    className={cn([styles.mailIcon, styles.svgOutline])}
                  ></Box>

                  <Text as="h2" variant="h4" color="blue400" truncate>
                    {t.digitalMailbox['title']}
                  </Text>
                  <Box borderRadius="full" />
                </Box>
              </div>
            </Box>
          </GridColumn>
          <GridColumn span={['12/12', '12/12', '12/12', '7/12']}>
            <GridContainer>
              <GridRow>{displayCards()}</GridRow>
            </GridContainer>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}

export default Dashboard
