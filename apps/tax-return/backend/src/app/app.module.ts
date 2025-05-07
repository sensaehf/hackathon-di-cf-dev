import { Module } from '@nestjs/common'

import { TaxSubmissionModule } from '../modules'
import { MortgageModule } from '../modules/mortgage/mortgage.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { SequelizeConfigService } from './sequelizeConfig.service'
import { SalaryModule } from '../modules/salary/salary.module'
import { PerkModule } from '../modules/perks/perk.module'
import { SubsidyModule } from '../modules/subsidy/subsidy.module'
import { RealEstateModule } from '../modules/realEstate/realEstate.module'
import { OtherReliabilitiesModule } from '../modules/other-reliabilities/other-reliabilities.module'
import { VehicleModule } from '../modules/vehicle/vehicle.module'

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    TaxSubmissionModule,
    MortgageModule,
    PerkModule,
    SalaryModule,
    SubsidyModule,
    PerkModule,
    RealEstateModule,
    OtherReliabilitiesModule,
    VehicleModule
  ]  
})
export class AppModule {}