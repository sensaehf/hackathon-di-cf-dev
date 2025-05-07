import { Inject, Injectable } from '@nestjs/common'
import { RealEstate } from './realEstate.model'
import type { Logger } from '@island.is/logging'
import { LOGGER_PROVIDER } from '@island.is/logging'
import { InjectModel } from '@nestjs/sequelize'
import { RealEstateViewModel } from './dto/realEstate.dto'
import { CreateRealEstateDto } from './dto/create-realEstate.dto'

@Injectable()
export class RealEstateService {

  constructor(
      @InjectModel(RealEstate)
      private realEstate: typeof RealEstate,
      @Inject(LOGGER_PROVIDER)
      private logger: Logger,
    ) {}

  create(createRealEstateDto: CreateRealEstateDto, taxSubmissionId: number): Promise<RealEstate> {

    try{
      return this.realEstate.create(
        {
          id: createRealEstateDto.id,
          taxSubmissionId: taxSubmissionId,
          address: createRealEstateDto.address,
          assessedValue: createRealEstateDto.assessedValue,
          currency : createRealEstateDto.currency
        })
    }
    catch (error) {
      this.logger.debug('Error creating real estate property', error)
      throw error;
    }
  }

  findAll() {
    return `This action returns all RealEstate`
  }

  async findAllByTaxSubmissionId(submissionId: number): Promise<RealEstate[] | null> {
      this.logger.debug(`Finding real estates for taxSubmissionId - "${submissionId}"`)
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
