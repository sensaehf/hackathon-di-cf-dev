import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Subsidy } from './subsidy.model'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'

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

}
