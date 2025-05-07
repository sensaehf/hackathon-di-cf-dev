import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Salary } from './salary.model';
import { LOGGER_PROVIDER } from '@island.is/logging';
import type { Logger } from '@island.is/logging';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';

@Injectable()
export class SalaryService {
  constructor(
    @InjectModel(Salary)
    private salary: typeof Salary,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async findByTaxSubmissionId(taxSubmissionId: number): Promise<Salary[] | null> {

    const result = await this.salary.findAll({
      where: { taxSubmissionId: taxSubmissionId },
    });

    return result || [];
  }

  async create(createSalaryDto: CreateSalaryDto & { taxSubmissionId: number }): Promise<Salary> {

    return this.salary.create({
      taxSubmissionId: createSalaryDto.taxSubmissionId,
      employerName: createSalaryDto.employerName,
      amount: createSalaryDto.amount,
      currency: createSalaryDto.currency,
      description: createSalaryDto.description,
      year: createSalaryDto.year,
    });
  }

  findAll() {
    return this.salary.findAll();
  }

  findOne(id: number) {
    return this.salary.findByPk(id);
  }

  async update(id: number, updateSalaryDto: UpdateSalaryDto) {
    this.salary.update(updateSalaryDto, {
      where: { id },
    });
    return await this.salary.findByPk(id);
  }

  remove(id: number) {
    return this.salary.destroy({
      where: { id },
    });
  }
}