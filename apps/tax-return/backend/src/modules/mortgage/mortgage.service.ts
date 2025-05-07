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

  async create(
    createMortgageDto: CreateMortgageDto,
    taxSubmissionId: number,
  ): Promise<Mortgage> {
    this.logger.debug(`Creating a mortgage with id - ${createMortgageDto.id}`)

    try {
      return await this.mortgage.create({
        ...createMortgageDto,
        taxSubmissionId: taxSubmissionId,
      })
    } catch (error) {
      this.logger.debug('Error creating a mortgage', error)
      throw error
    }
  }

  findAll() {
    return `This action returns all mortgage`
  }

  async findAllBySubmissionId(
    submissionId: number,
  ): Promise<Mortgage[] | null> {
    this.logger.debug(`Finding mortgages for submissionId - "${submissionId}"`)
    return this.mortgage.findAll({
      where: { taxSubmissionId: submissionId },
    })
  }

  async findOne(id: string) {
    return await this.mortgage.findByPk(id)
  }

  async update(id: string, updateMortgageDto: UpdateMortgageDto) {
    await this.mortgage.update(updateMortgageDto, { where: { id } })
    return await this.mortgage.findByPk(updateMortgageDto.id)
  }

  async remove(id: string) {
    return await this.mortgage.destroy({
      where: { id },
    })
  }
}
