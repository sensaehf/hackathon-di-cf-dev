import { Module } from '@nestjs/common'
import { RealEstateService } from './realEstate.service'
import { RealEstateController } from './realEstate.controller'
import { RealEstate } from './realEstate.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [SequelizeModule.forFeature([RealEstate])],
  controllers: [RealEstateController],
  providers: [RealEstateService],
})
export class RealEstateModule {}
