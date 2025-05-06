import { Module } from '@nestjs/common'

import { TaxSubmissionModule } from '../modules'
import { MortgageModule } from '../modules/mortgage/mortgage.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { SequelizeConfigService } from './sequelizeConfig.service'

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    TaxSubmissionModule,
    MortgageModule
  ]  
})
export class AppModule {}