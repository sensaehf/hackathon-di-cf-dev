import React from 'react'
import { useRouter } from 'next/router'
import {
  Header,
  Box,
  Divider,
  Page,
  Link,
  Button,
  GridContainer,
  GridRow,
  GridColumn,
  TableOfContents,
  Breadcrumbs,
  BreadCrumbItem,
  Text,
  BulletList,
  Bullet,
  ActionCard,
  Footer,
  Navigation,
  NavigationItem,
  Hidden,
} from '@island.is/island-ui/core'

import en from '../../public/locales/en/landing.json'
import is from '../../public/locales/is/landing.json'

const translations: any = { en, is }

const Landing = () => {
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

  const breadcrumbs: BreadCrumbItem[] = [
    {
      title: t.breadcrumbs['islandIs'],
      href: '#',
    },
    {
      title: t.breadcrumbs['financesAndTaxes'],
      href: '#',
    },
    {
      title: t.breadcrumbs['fileYourTaxReturn'],
      href: '#',
    },
  ]

  return (
    <>
      <main>
        <GridContainer>
          <GridRow marginBottom={20}>
            <GridColumn span={['12/12', '4/12']}>
              <Box background={'blue100'} borderRadius={'large'} marginTop={5}>
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
              <Breadcrumbs items={breadcrumbs} />
              <Text variant="h1" marginY={2} as={'h1'} id="main-content">
                {t.pageTitle}
              </Text>
              <Text variant="medium" marginBottom={2}>
                {t.introText}
              </Text>
              <Text variant="medium" marginBottom={5}>
                {t.filingInfo}
              </Text>
              <Text variant="h2" as={'h2'}>
                {t.checkTaxesTitle}
              </Text>
              <Text variant="medium" marginY={2}>
                {t.checkTaxesInfo}
              </Text>
              <Text variant="h2" marginY={3} as={'h2'}>
                {t.heading}
              </Text>
              <BulletList type="ul" color="black">
                <Bullet>{t.bulletList['logIn']}</Bullet>
                <Bullet>{t.bulletList['review']}</Bullet>
                <Bullet>{t.bulletList['saveDraft']}</Bullet>
                <Bullet>{t.bulletList['submit']}</Bullet>
                <Bullet>{t.bulletList['viewPrevious']}</Bullet>
              </BulletList>
              <br></br>
              <br></br>
              <ActionCard
                backgroundColor="blue"
                cta={{
                  label: t.actionCard['ctaLabel'],
                  variant: 'primary',
                  icon: 'open',
                  iconType: 'outline',
                  onClick: () => {
                    push('login')
                  },
                }}
                heading={t.actionCard['heading']}
                headingVariant="h3"
              ></ActionCard>
            </GridColumn>
          </GridRow>
        </GridContainer>
        <Footer />
      </main>
    </>
  )
}

export default Landing
