import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Subsidy } from './subsidy.model'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { CreateSubsidyDto } from './dto/create-subsidy.dto'
import { UpdateSubsidyDto } from './dto/update-subsidy.dto'

@Injectable()
export class SubsidyService 
{
  constructor(
    @InjectModel(Subsidy)
    private subsidy: typeof Subsidy,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}
  
  async findByTaxSubmissionId(taxSubmissionId: number): Promise<Subsidy[] | null> {
    this.logger.debug(`Finding subsidies for taxSubmissionId - "${taxSubmissionId}"`)
    
    const result = await this.subsidy.findAll({
      where: { taxSubmissionId: taxSubmissionId },
    })
    
    return result || []
  }
  
  async create(dto: CreateSubsidyDto, taxSubmissionId: number) {
    return await this.subsidy.create({...dto, taxSubmissionId})
  }

  async update(dto: UpdateSubsidyDto, taxSubmissionId: number) {
    await this.subsidy.update({...dto, taxSubmissionId}, {where: {id : dto.id}})    
    return await this.subsidy.findByPk(dto.id)
  }
}
