import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UniqueConstraintError } from 'sequelize';
import { TaxSubmission } from './taxSubmission.model'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { CreateTaxSubmissionDto } from './dto/create-taxSubmission.dto'

@Injectable()
export class TaxSubmissionService {
  constructor(
    @InjectModel(TaxSubmission)
    private taxSubmission: typeof TaxSubmission,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) { }

  async findByPersonId(personId: number): Promise<TaxSubmission[] | null> {
    this.logger.debug(`Finding tax submissions for nationalId - "${personId}"`)

    const result = await this.taxSubmission.findAll({
      where: { personId: personId },
    })

    return result || []
  }

  async create(taxSubmission: CreateTaxSubmissionDto): Promise<TaxSubmission> {
    this.logger.debug(
      `Creating tax submission with person id - ${taxSubmission.personId} and tax year ${taxSubmission.taxYear}`,
    )

    try {
      return await this.taxSubmission.create({
        personId: taxSubmission.personId,
        taxYear: taxSubmission.taxYear
      })
    }
    catch (error) {
      this.logger.debug('Error creating tax submission', error)
      if (error instanceof UniqueConstraintError) {
        throw new ConflictException('Submission for this person and tax year already exists.');
      }
      throw error;
    }
  }
}
