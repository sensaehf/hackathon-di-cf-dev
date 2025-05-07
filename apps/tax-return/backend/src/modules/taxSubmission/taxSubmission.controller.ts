import { Body, Controller, Get, Headers, Post } from '@nestjs/common'

import { TaxSubmissionService } from './taxSubmission.service'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { TaxSubmissionViewModel } from './dto/taxSubmissionViewModel.dto'
import { NationalIdHeader } from '../../app/constants'
import { TaxSubmission } from './taxSubmission.model'
import { TaxSubmissionResponse } from './dto/taxSubmissionResponse'
import { CreateTaxSubmissionDto } from './dto/create-taxSubmission.dto'

@ApiTags('Tax Submissions')
@Controller('v1/tax-submissions')
export class TaxSubmissionController {
  constructor(private readonly taxSubmissionService: TaxSubmissionService) {}

  @ApiOkResponse({type: TaxSubmissionResponse})
  @Get()
  async getById(@Headers(NationalIdHeader) personId: number) {
    let submissions : TaxSubmission[] | null = [];
    await this.taxSubmissionService.findByPersonId(personId)
    .then((e) =>
    {
      submissions = e
    })
    
    return new TaxSubmissionResponse(submissions?.map(o => new TaxSubmissionViewModel(o)) ?? []);
    
    
  }

  @ApiCreatedResponse({type: TaxSubmissionViewModel})
  @Post()
  async create(@Body() createTaxSubmissionDto : CreateTaxSubmissionDto){
    const taxSubmission = await this.taxSubmissionService.create(createTaxSubmissionDto);
    return new TaxSubmissionViewModel(taxSubmission);
  }
}
