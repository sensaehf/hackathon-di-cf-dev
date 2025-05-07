import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Vehicle } from './vehicle.model'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'

@Injectable()
export class VehicleService 
{
  constructor(
    @InjectModel(Vehicle)
    private vehicle: typeof Vehicle,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async findByTaxSubmissionId(taxSubmissionId: number): Promise<Vehicle[] | null> {
    this.logger.debug(`Finding vehicles for taxSubmissionId - "${taxSubmissionId}"`)
   
    const result = await this.vehicle.findAll({
      where: { taxSubmissionId: taxSubmissionId },
    })

    return result || []
  }

}
