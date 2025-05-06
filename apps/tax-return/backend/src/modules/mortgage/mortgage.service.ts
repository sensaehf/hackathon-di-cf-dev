import { Inject, Injectable } from '@nestjs/common'
import { CreateMortgageDto } from './dto/create-mortgage.dto'
import { UpdateMortgageDto } from './dto/update-mortgage.dto'
import { Mortgage } from './mortgage.model'
import type { Logger } from '@island.is/logging'
import { LOGGER_PROVIDER } from '@island.is/logging'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class MortgageService {

  constructor(
      @InjectModel(Mortgage)
      private mortgage: typeof Mortgage,
      @Inject(LOGGER_PROVIDER)
      private logger: Logger,
    ) {}

  create(createMortgageDto: CreateMortgageDto) {
    return 'This action adds a new mortgage'
  }

  findAll() {
    return `This action returns all mortgage`
  }

  async findAllBySubmissionId(submissionId: number): Promise<Mortgage[] | null> {
      this.logger.debug(`Finding mortgages for submissionId - "${submissionId}"`)
      return this.mortgage.findAll({
        where: { taxSubmissionId: submissionId },
      })
    }

  findOne(id: number) {
    return `This action returns a #${id} mortgage`
  }

  update(id: number, updateMortgageDto: UpdateMortgageDto) {
    return `This action updates a #${id} mortgage`
  }

  remove(id: number) {
    return `This action removes a #${id} mortgage`
  }
}
