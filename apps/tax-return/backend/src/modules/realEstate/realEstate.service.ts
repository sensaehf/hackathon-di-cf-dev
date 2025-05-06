import { Inject, Injectable } from '@nestjs/common'
import { RealEstate } from './realEstate.model'
import type { Logger } from '@island.is/logging'
import { LOGGER_PROVIDER } from '@island.is/logging'
import { InjectModel } from '@nestjs/sequelize'
import { RealEstateViewModel } from './dto/realEstate.dto'

@Injectable()
export class RealEstateService {

  constructor(
      @InjectModel(RealEstate)
      private realEstate: typeof RealEstate,
      @Inject(LOGGER_PROVIDER)
      private logger: Logger,
    ) {}

  create(createRealEstateDto: RealEstateViewModel) {
    return 'This action adds a new RealEstate'
  }

  findAll() {
    return `This action returns all RealEstate`
  }

  async findAllBySubmissionId(submissionId: number): Promise<RealEstate[] | null> {
      this.logger.debug(`Finding RealEstates for submissionId - "${submissionId}"`)
      return this.realEstate.findAll({
        where: { taxSubmissionId: submissionId },
      })
    }

  findOne(id: number) {
    return `This action returns a #${id} RealEstate`
  }

  update(id: number, updateRealEstateDto: RealEstateViewModel) {
    return `This action updates a #${id} RealEstate`
  }

  remove(id: number) {
    return `This action removes a #${id} RealEstate`
  }
}
