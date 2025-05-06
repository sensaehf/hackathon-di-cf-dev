import { Module } from '@nestjs/common'

import { TaxSubmissionModule } from '../modules'
import { MortgageModule } from '../modules/mortgage/mortgage.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { SequelizeConfigService } from './sequelizeConfig.service'
import { SalaryModule } from '../modules/salary/salary.module'
import { PerkModule } from '../modules/perks/perk.module'
import { SubsidyModule } from '../modules/subsidy/subsidy.module'
import { RealEstateModule } from '../modules/realEstate/realEstate.module'

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
    RealEstateModule
  ]  
})
export class AppModule {}