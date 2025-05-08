import { Inject, Injectable } from '@nestjs/common'
import { RealEstate } from './realEstate.model'
import type { Logger } from '@island.is/logging'
import { LOGGER_PROVIDER } from '@island.is/logging'
import { InjectModel } from '@nestjs/sequelize'
import { CreateRealEstateDto } from './dto/create-realEstate.dto'
import { UpdateRealEstateDto } from './dto/update-realEstate.dto'

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
    return this.realEstate.findAll()
  }

  async findAllByTaxSubmissionId(submissionId: number): Promise<RealEstate[] | null> {
      this.logger.debug(`Finding real estates for taxSubmissionId - "${submissionId}"`)
      return await this.realEstate.findAll({
        where: { taxSubmissionId: submissionId },
      })
    }

  findOne(id: string) {
    return this.realEstate.findByPk(id)
  }

  async update(id: string, updateRealEstateDto: UpdateRealEstateDto) {
    await this.realEstate.update(updateRealEstateDto, {
      where: { id },
    })
    return await this.realEstate.findByPk(id)
  }

  remove(id: string) {
    return this.realEstate.destroy({
      where: { id },
    })
  }
}
