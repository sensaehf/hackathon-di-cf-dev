import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Salary } from './salary.model'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'

@Injectable()
export class SalaryService 
{
  constructor(
    @InjectModel(Salary)
    private salary: typeof Salary,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async findByTaxSubmissionId(taxSubmissionId: number): Promise<Salary[] | null> {
    this.logger.debug(`Finding salaries for taxSubmissionId - "${taxSubmissionId}"`)
   
    const result = await this.salary.findAll({
      where: { taxSubmissionId: taxSubmissionId },
    })

    return result || []
  }

}
