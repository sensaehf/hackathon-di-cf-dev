import { Inject, Injectable } from '@nestjs/common';
import { CreateReliabilityDto } from './dto/create-reliability.dto';
import { UpdateReliabilityDto } from './dto/update-reliability.dto';
import { OtherReliabilities } from './other-reliabilities.model';
import type { Logger } from '@island.is/logging';
import { LOGGER_PROVIDER } from '@island.is/logging';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OtherReliabilitiesService {
  constructor(
    @InjectModel(OtherReliabilities)
    private otherReliabilities: typeof OtherReliabilities,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  create(createReliabilityDto: CreateReliabilityDto) {
    return this.otherReliabilities.create(createReliabilityDto);
  }

  findAll() {
    return this.otherReliabilities.findAll();
  }

  async findAllBySubmissionId(
    submissionId: number,
  ): Promise<OtherReliabilities[] | null> {
    
    return this.otherReliabilities.findAll({
      where: { taxSubmissionId: submissionId },
    });
  }

  findOne(id: number) {
    return this.otherReliabilities.findByPk(id);
  }

  update(id: number, updateReliabilityDto: UpdateReliabilityDto) {
    this.otherReliabilities.update(updateReliabilityDto, {
      where: { id },
    });
    return this.otherReliabilities.findByPk(id)
  }

  remove(id: number) {
    return this.otherReliabilities.destroy({
      where: { id },
    });
  }
}