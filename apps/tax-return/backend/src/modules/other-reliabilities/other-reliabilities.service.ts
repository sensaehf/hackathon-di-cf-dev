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
    this.logger.debug('Creating a new reliability entry');
    return this.otherReliabilities.create(createReliabilityDto);
  }

  findAll() {
    this.logger.debug('Fetching all reliability entries');
    return this.otherReliabilities.findAll();
  }

  async findAllBySubmissionId(
    submissionId: number,
  ): Promise<OtherReliabilities[] | null> {
    this.logger.debug(
      `Finding reliabilities for submissionId - "${submissionId}"`,
    );
    return this.otherReliabilities.findAll({
      where: { taxSubmissionId: submissionId },
    });
  }

  findOne(id: number) {
    this.logger.debug(`Fetching reliability entry with id - "${id}"`);
    return this.otherReliabilities.findByPk(id);
  }

  update(id: number, updateReliabilityDto: UpdateReliabilityDto) {
    this.logger.debug(`Updating reliability entry with id - "${id}"`);
    return this.otherReliabilities.update(updateReliabilityDto, {
      where: { id },
    });
  }

  remove(id: number) {
    this.logger.debug(`Removing reliability entry with id - "${id}"`);
    return this.otherReliabilities.destroy({
      where: { id },
    });
  }
}