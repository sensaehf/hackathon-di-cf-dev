import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common'

import { SubsidyService } from './subsidy.service'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Subsidy } from './subsidy.model'
import { SubsidyResponse } from './dto/subsidyResponse';
import { SubsidyViewModel } from './dto/subsidyViewModel.dto';
import { CreateSubsidyDto } from './dto/create-subsidy.dto';
import { UpdateSubsidyDto } from './dto/update-subsidy.dto';


@ApiTags('Subsidy work payments')
@Controller('v1/tax-submissions/:taxSubmissionId/subsidies')
export class SubsidyController {
  constructor(private readonly subsidyService: SubsidyService) {}

  @ApiOkResponse({type: SubsidyResponse})
  @Get()
  async getByTaxSubmissionId(@Param('taxSubmissionId')taxSubmissionId: number) {
    let subsidies : Subsidy[] | null = [];
    await this.subsidyService.findByTaxSubmissionId(taxSubmissionId)
    .then((e) =>
    {
      subsidies = e
    })
    
    return new SubsidyResponse(subsidies?.map(o => new SubsidyViewModel(o)) ?? []);    
  }

  @ApiCreatedResponse({type: SubsidyViewModel})
  @Post()
  async create(@Body() dto: CreateSubsidyDto, @Param('taxSubmissionId', ParseIntPipe) taxSubmissionId: number)
  {
    const result = await this.subsidyService.create(dto, taxSubmissionId)

    return new SubsidyViewModel(result)
  }

  @ApiOkResponse({type: SubsidyViewModel})
  @Put()
  async update(@Body() dto: UpdateSubsidyDto, @Param('taxSubmissionId', ParseIntPipe) taxSubmissionId: number){
    const result = await this.subsidyService.update(dto, taxSubmissionId)

    if(result !== null)
      return new SubsidyViewModel(result)

    throw new BadRequestException('The supplied subsidy could not be updated')
  }

}
