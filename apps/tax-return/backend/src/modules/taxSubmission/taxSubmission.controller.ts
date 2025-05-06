import { Controller, Get, Headers } from '@nestjs/common'

import { TaxSubmissionService } from './taxSubmission.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { TaxSubmissionViewModel } from './dto/taxSubmissionViewModel.dto'
import { NationalIdHeader } from '../../app/constants'

@ApiTags('taxSubmissions')
@Controller('v1/taxSubmissions')
export class TaxSubmissionController {
  constructor(private readonly taxSubmissionService: TaxSubmissionService) {}

  @ApiOkResponse({type: TaxSubmissionViewModel})
  @Get()
  getById(@Headers(NationalIdHeader) personId: number) {
    return this.taxSubmissionService.findByPersonId(personId)
  }
}
