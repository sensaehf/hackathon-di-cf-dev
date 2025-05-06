import { Module } from '@nestjs/common'

import { PerkController } from './perk.controller'
import { PerkService } from './perk.service'
import { Perk } from './perk.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [
    SequelizeModule.forFeature([Perk]),
  ],
  controllers: [
    PerkController
  ],
  providers: [
    PerkService
  ],
})
export class PerkModule {}
