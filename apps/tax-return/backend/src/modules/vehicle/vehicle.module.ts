import { Module } from '@nestjs/common'

import { VehicleController } from './vehicle.controller'
import { VehicleService } from './vehicle.service'
import { Vehicle } from './vehicle.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [
    SequelizeModule.forFeature([Vehicle]),
  ],
  controllers: [
    VehicleController
  ],
  providers: [
    VehicleService
  ],
})
export class VehicleModule {}
