import { Module } from '@nestjs/common'

import { ApolloDriver } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { BackendAPI } from '../services'
import { environment } from '../environments'
import { TaxSubmissionModule } from './modules/tax-submission/tax-submission.module'
import { MortgageInterestModule } from './modules/mortgage-interest/mortgage-interest.module'
import { OtherReliabilitiesModule } from './modules/other-reliabilities/other-reliabilities.module'
import { PensionsGrantsSubsidiesModule } from './modules/pensions-grants-subsidies/pensions-grants-subsidies.module'
import { PerDiemAndPerksModule } from './modules/per-diem-and-perks/per-diem-and-perks.module'
import { RealEstateModule } from './modules/real-estate/real-estate.module'
import { SalaryWorkPaymentsModule } from './modules/salary-work-payments/salary-work-payments.module'
import { VehicleModule } from './modules/vehicle/vehicle.module'

const debug = process.env.NODE_ENV === 'development'
const playground = debug || process.env.GQL_PLAYGROUND_ENABLED === 'true'

const autoSchemaFile = environment.production
  ? true
  : 'apps/tax-return/api/src/api.graphql'

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug,
      playground,
      autoSchemaFile,
      path: '/api/graphql',
      context: ({ req }) => ({ req }),
      dataSources: () => ({ backendApi: new BackendAPI() }),
      driver: ApolloDriver,
    }),
    TaxSubmissionModule,
    MortgageInterestModule,
    OtherReliabilitiesModule,
    PensionsGrantsSubsidiesModule,
    PerDiemAndPerksModule,
    RealEstateModule,
    SalaryWorkPaymentsModule,
    VehicleModule,
  ],
})
export class AppModule {}
