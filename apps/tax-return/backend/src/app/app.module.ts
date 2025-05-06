import { Module } from '@nestjs/common'

import { TaxSubmissionModule } from '../modules'
import { MortgageModule } from '../modules/mortgage/mortgage.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { SequelizeConfigService } from './sequelizeConfig.service'
import { SalaryModule } from '../modules/salary/salary.module'
import { PerkModule } from '../modules/perks/perk.module'
import { SubsidyModule } from '../modules/subsidy/subsidy.module'
<<<<<<< HEAD
import { OtherReliabilitiesModule } from '../modules/other-reliabilities/other-reliabilities.module'
=======
import { VehicleModule } from '../modules/vehicle/vehicle.module'
>>>>>>> 527ea937a2 (TADI-107 GET Vehicles for tax submission id)

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
<<<<<<< HEAD
    OtherReliabilitiesModule
=======
    VehicleModule
>>>>>>> 527ea937a2 (TADI-107 GET Vehicles for tax submission id)
  ]  
})
export class AppModule {}