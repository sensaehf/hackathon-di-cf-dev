import { Controller, Get, Headers } from '@nestjs/common'

import { TaxSubmissionService } from './taxSubmission.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { TaxSubmissionViewModel } from './dto/taxSubmissionViewModel.dto'
import { NationalIdHeader } from '../../app/constants'
import { TaxSubmission } from './taxSubmission.model'
import { TaxSubmissionResponse } from './dto/taxSubmissionResponse'

@ApiTags('taxSubmissions')
@Controller('v1/taxSubmissions')
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
}
