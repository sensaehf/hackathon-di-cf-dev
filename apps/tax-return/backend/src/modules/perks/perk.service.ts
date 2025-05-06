import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Perk } from './perk.model'
import { PerkViewModel } from './dto/perkViewModel.dto'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'

@Injectable()
export class PerkService 
{
  constructor(
    @InjectModel(Perk)
    private perk: typeof Perk,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async findByTaxSubmissionId(taxSubmissionId: number): Promise<Perk[] | null> {
    this.logger.debug(`Finding perks for taxSubmissionId - "${taxSubmissionId}"`)
   
    const result = await this.perk.findAll({
      where: { taxSubmissionId: taxSubmissionId },
    })

    return result || []
  }

  async create(perk: PerkViewModel): Promise<Perk> {
    this.logger.debug(
      `Creating perks with tax submission id - ${perk.taxSubmissionId}`,
    )
    
    return this.perk.create({
      taxSubmissionId: perk.taxSubmissionId,
      currency: perk.currency,
      amount: perk.amount,
      type: perk.type,
      description: perk.description
    })
  }
}
