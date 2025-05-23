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
import { PersonModule } from './modules/person/person.module'
import { NationalRegistryApi } from '../services/nationalRegistry'

const debug = process.env.NODE_ENV === 'development'
const playground = debug || process.env.GQL_PLAYGROUND_ENABLED === 'true'
const allowedOrigins = [
  'http://localhost:4200',
  'https://cf-web.sensa-di.scm.is',
]

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
      context: ({ req }: { req: Request }) => ({ req }),
      dataSources: () => ({ 
        backendApi: new BackendAPI(), 
        nationalRegistryApi: new NationalRegistryApi()
      }),
      cors: {
        origin: allowedOrigins,
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      },
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
    PersonModule,
  ],
})
export class AppModule {}
