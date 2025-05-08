import {
  ActionCard,
  Box,
  BreadCrumbItem,
  Button,
  Divider,
  FormStepperSection,
  FormStepperV2,
  GridColumn,
  GridContainer,
  GridRow,
  Hidden,
  Icon,
  Link,
  Navigation,
  NavigationItem,
  Section,
  Text,
} from '@island.is/island-ui/core'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

import en from '../../public/locales/en/application-system.json'
import is from '../../public/locales/is/application-system.json'

const translations: any = { en, is }

const ApplicationSystem = () => {
  const { locale = 'en', push } = useRouter()

  const t = translations[locale] || translations.en

  const navigationItems: NavigationItem[] = [
    {
      title: t.navigation['myApplications'],
      href: '#',
    },
    {
      title: t.navigation['applicationsInProgress'],
      href: '#',
    },
    {
      title: t.navigation['unfinishedApplications'],
      href: '#',
    },
    {
      title: t.navigation['finishedApplications'],
      href: '#',
    },
  ]

  return (
    <>
      <main>
        <GridContainer>
          <GridRow marginBottom={20}>
            <GridColumn span={['12/12', '4/12']}>
              <Button variant="text" size="small">
                <Box display="flex" alignItems={'center'} marginY={2}>
                  <Icon icon="arrowBack" size="small" />
                  {t.buttons['backToDashboard']}
                </Box>
              </Button>
              <Box background={'blue100'} borderRadius={'large'}>
                <Hidden above={'xs'}>
                  <Navigation
                    title={t.headings['applications']}
                    items={navigationItems}
                    baseId={''}
                    isMenuDialog={true}
                  ></Navigation>
                </Hidden>
                <Hidden below={'sm'}>
                  <Navigation
                    title={t.headings['applications']}
                    items={navigationItems}
                    baseId={''}
                    isMenuDialog={false}
                  ></Navigation>
                </Hidden>
              </Box>
            </GridColumn>
            <GridColumn span={['12/12', '8/12']}>
              <Text
                variant="h1"
                marginY={2}
                as={'h1'}
                id="main-content"
                marginTop={6}
              >
                {t.headings['myTaxReturns']}
              </Text>
              <Text variant="medium" marginBottom={2}>
                {t.descriptions['taxReturnsIntro']}
              </Text>
              <Text variant="medium" marginBottom={5}>
                {t.descriptions['taxReturnsDetails']}
              </Text>{' '}
              <ActionCard
                cta={{
                  label: t.buttons['continueTaxReturn'],
                  variant: 'primary',
                  icon: 'open',
                  iconType: 'outline',
                  onClick: () => {
                    push('/application-system/intro')
                  },
                }}
                heading={t.headings['taxReturn2024']}
                headingVariant="h3"
                text={t.descriptions['taxReturn2024Details']}
              ></ActionCard>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </main>
    </>
  )
}

export default ApplicationSystem
