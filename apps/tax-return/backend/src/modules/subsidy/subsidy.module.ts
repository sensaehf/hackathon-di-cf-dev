import { Module } from '@nestjs/common'

import { SubsidyController } from './subsidy.controller'
import { SubsidyService } from './subsidy.service'
import { Subsidy } from './subsidy.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [
    SequelizeModule.forFeature([Subsidy]),
  ],
  controllers: [
    SubsidyController
  ],
  providers: [
    SubsidyService
  ],
})
export class SubsidyModule {}
