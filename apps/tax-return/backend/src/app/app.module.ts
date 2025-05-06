import { Module } from '@nestjs/common'

import { TaxSubmissionModule } from '../modules'
import { SequelizeModule } from '@nestjs/sequelize'
import { SequelizeConfigService } from './sequelizeConfig.service'

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    TaxSubmissionModule
  ]  
})
export class AppModule {}
