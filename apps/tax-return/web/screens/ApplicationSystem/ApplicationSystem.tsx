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

import en from '../../public/locales/en/landing.json'
import is from '../../public/locales/is/landing.json'

const translations: any = { en, is }

const ApplicationSystem = () => {
  const { locale = 'en', push } = useRouter()

  const t = translations[locale] || translations.en

  const navigationItems: NavigationItem[] = [
    {
      title: t.headings[0],
      href: '#',
    },
    {
      title: t.headings[1],
      href: '#',
    },
    {
      title: t.headings[2],
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
                  Back to dashboard
                </Box>
              </Button>
              <Box background={'blue100'} borderRadius={'large'}>
                <Hidden above={'xs'}>
                  <Navigation
                    title={t.tableOfContentsTitle}
                    items={navigationItems}
                    baseId={''}
                    isMenuDialog={true}
                  ></Navigation>
                </Hidden>
                <Hidden below={'sm'}>
                  <Navigation
                    title={t.tableOfContentsTitle}
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
                My tax returns
              </Text>
              <Text variant="medium" marginBottom={2}>
                Here you’ll find everything related to your tax returns in one
                place.
              </Text>
              <Text variant="medium" marginBottom={5}>
                You can view the status of your current tax return, check
                previous submissions, and continue where you left off.
              </Text>{' '}
              <ActionCard
                cta={{
                  label: 'Continue Tax Return',
                  variant: 'primary',
                  icon: 'open',
                  iconType: 'outline',
                  onClick: () => {
                    push('/application-system/intro')
                  },
                }}
                heading={'Tax Return 2024'}
                headingVariant="h3"
                text="View, edit and submit your Tax Return"
              ></ActionCard>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </main>
    </>
  )
}

export default ApplicationSystem
