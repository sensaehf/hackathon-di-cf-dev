import { Module } from '@nestjs/common'

import { ConsentController } from './consent.controller'
import { ConsentService } from './consent.service'
import { Consent } from './consent.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [SequelizeModule.forFeature([Consent])],
  controllers: [ConsentController],
  providers: [ConsentService],
})
export class ConcentModule {}
