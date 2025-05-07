import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete } from '@nestjs/common';

import { SubsidyService } from './subsidy.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Subsidy } from './subsidy.model';
import { SubsidyResponse } from './dto/subsidyResponse';
import { SubsidyViewModel } from './dto/subsidyViewModel.dto';
import { CreateSubsidyDto } from './dto/create-subsidy.dto';
import { UpdateSubsidyDto } from './dto/update-subsidy.dto';

@ApiTags('Subsidy work payments')
@Controller('v1/tax-submissions/:taxSubmissionId/subsidies')
export class SubsidyController {
  constructor(private readonly subsidyService: SubsidyService) {}

  @ApiOkResponse({ type: SubsidyResponse })
  @Get()
  async getByTaxSubmissionId(@Param('taxSubmissionId') taxSubmissionId: number) {
    let subsidies: Subsidy[] | null = [];
    await this.subsidyService.findByTaxSubmissionId(taxSubmissionId).then((e) => {
      subsidies = e;
    });

    return new SubsidyResponse(subsidies?.map((o) => new SubsidyViewModel(o)) ?? []);
  }

  @ApiCreatedResponse({ type: SubsidyViewModel })
  @Post()
  async create(
    @Body() dto: CreateSubsidyDto,
    @Param('taxSubmissionId', ParseIntPipe) taxSubmissionId: number,
  ) {
    const result = await this.subsidyService.create(dto, taxSubmissionId);

    return new SubsidyViewModel(result);
  }

  @ApiOkResponse({ type: SubsidyViewModel })
  @Put(':id')
  async update(
    @Body() dto: UpdateSubsidyDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const result = await this.subsidyService.update(dto, id);

    if (result !== null) return new SubsidyViewModel(result);

    throw new BadRequestException('The supplied subsidy could not be updated');
  }

  @ApiOkResponse({ type: SubsidyViewModel })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const subsidy = await this.subsidyService.findOne(id);

    if (subsidy) return new SubsidyViewModel(subsidy);

    throw new BadRequestException('The requested subsidy could not be found');
  }

  @ApiOkResponse({ type: Boolean })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.subsidyService.remove(id);

    if (result) return true;

    throw new BadRequestException('The subsidy could not be deleted');
  }
}