import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SalaryService } from './salary.service';
import { Salary } from './salary.model';
import { SalaryResponse } from './dto/salaryResponse';
import { SalaryViewModel } from './dto/salaryViewModel.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { CreateSalaryDto } from './dto/create-salary.dto';

@ApiTags('Salary work payments')
@Controller('v1/tax-submissions/:taxSubmissionId/salaries')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @ApiOkResponse({ type: SalaryResponse })
  @Get()
  async getByTaxSubmissionId(@Param('taxSubmissionId') taxSubmissionId: number) {
    let salaries: Salary[] | null = [];
    await this.salaryService.findByTaxSubmissionId(taxSubmissionId).then((e) => {
      salaries = e;
    });

    return new SalaryResponse(salaries?.map((o) => new SalaryViewModel(o)) ?? []);
  }

  @Post()
  create(
    @Param('taxSubmissionId') taxSubmissionId: number,
    @Body() createSalaryDto: CreateSalaryDto,
  ) {
    return this.salaryService.create({ ...createSalaryDto, taxSubmissionId });
  }

  @ApiOkResponse({ type: SalaryViewModel })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaryService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSalaryDto: UpdateSalaryDto,
  ) {
    return this.salaryService.update(+id, updateSalaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaryService.remove(+id);
  }
}