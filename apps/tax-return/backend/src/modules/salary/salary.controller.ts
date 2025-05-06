import { Controller, Get, Param } from '@nestjs/common'

import { SalaryService } from './salary.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { SalaryViewModel } from './dto/salaryViewModel.dto'
import { Salary } from './salary.model'
import { SalaryResponse } from './dto/salaryResponse'

@ApiTags('Salary work payments')
@Controller('v1/taxSubmissions/:taxSubmissionId/salarys')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}


  @ApiOkResponse({type: SalaryResponse})
  @Get()
  async getByTaxSubmissionId(@Param('taxSubmissionId')taxSubmissionId: number) {
    let salaries : Salary[] | null = [];
    await this.salaryService.findByTaxSubmissionId(taxSubmissionId)
    .then((e) =>
    {
      salaries = e
    })
    
    return new SalaryResponse(salaries?.map(o => new SalaryViewModel(o)) ?? []);
    
    
  }
}
