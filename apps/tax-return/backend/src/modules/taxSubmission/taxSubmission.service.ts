import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { TaxSubmission } from './taxSubmission.model'
import { TaxSubmissionViewModel } from './dto/taxSubmissionViewModel.dto'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'

@Injectable()
export class TaxSubmissionService 
{
  constructor(
    @InjectModel(TaxSubmission)
    private taxSubmission: typeof TaxSubmission,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async findByPersonId(personId: number): Promise<TaxSubmission[] | null> {
    this.logger.debug(`Finding resource for nationalId - "${personId}"`)
    return this.taxSubmission.findAll({
      where: { person_id: personId },
    })
  }

  async create(taxSubmission: TaxSubmissionViewModel): Promise<TaxSubmission> {
    this.logger.debug(
      `Creating resource with person id - ${taxSubmission.personId}`,
    )
    
    return this.taxSubmission.create({
      person_id: taxSubmission.personId,
      tax_year: taxSubmission.taxYear
    })
  }
}
