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
    this.logger.debug(`Finding tax submissions for nationalId - "${personId}"`)
   
    const result = await this.taxSubmission.findAll({
      where: { person_id: personId },
    })

    return result || []
  }

  async create(taxSubmission: TaxSubmissionViewModel): Promise<TaxSubmission> {
    this.logger.debug(
      `Creating tax submission with person id - ${taxSubmission.personId} and tax year ${taxSubmission.taxYear}`,
    )
    
    return this.taxSubmission.create({
      person_id: taxSubmission.personId,
      tax_year: taxSubmission.taxYear
    })
  }
}
