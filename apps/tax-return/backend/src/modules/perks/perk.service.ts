import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Perk } from './perk.model';
import { LOGGER_PROVIDER } from '@island.is/logging';
import type { Logger } from '@island.is/logging';
import { CreatePerkDto } from './dto/create-perk.dto';
import { UpdatePerkDto } from './dto/update-perk.dto';

@Injectable()
export class PerkService {
  constructor(
    @InjectModel(Perk)
    private perk: typeof Perk,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async findByTaxSubmissionId(taxSubmissionId: number): Promise<Perk[] | null> {

    const result = await this.perk.findAll({
      where: { taxSubmissionId: taxSubmissionId },
    });

    return result || [];
  }

  async create(perk: CreatePerkDto & { taxSubmissionId: number }): Promise<Perk> {

    return this.perk.create({
      taxSubmissionId: perk.taxSubmissionId,
      currency: perk.currency,
      amount: perk.amount,
      type: perk.type,
      description: perk.description,
    });
  }

  findAll() {
    return this.perk.findAll();
  }

  findOne(id: number) {
    return this.perk.findByPk(id);
  }

  update(id: number, updatePerkDto: UpdatePerkDto) {
    return this.perk.update(updatePerkDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.perk.destroy({
      where: { id },
    });
  }
}