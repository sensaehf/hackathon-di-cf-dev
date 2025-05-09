import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OtherReliabilitiesService } from './other-reliabilities.service';
import { CreateReliabilityDto } from './dto/create-reliability.dto';
import { UpdateReliabilityDto } from './dto/update-reliability.dto';
import { OtherReliabilities } from './other-reliabilities.model';
import { OtherReliabilitiesResponse } from './dto/reliabilityResponse';
import { OtherReliabilitiesViewModel } from './dto/reliability.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Other Reliabilities')
@Controller('v1/tax-submissions/:taxSubmissionId/other-reliabilities')
export class OtherReliabilitiesController {
  constructor(
    private readonly otherReliabilitiesService: OtherReliabilitiesService,
  ) {}

  @Post()
  create(@Body() createReliabilityDto: CreateReliabilityDto) {
    return this.otherReliabilitiesService.create(createReliabilityDto);
  }

  @ApiOkResponse({ type: OtherReliabilitiesResponse })
  @Get()
  async findAll(@Param('taxSubmissionId') taxSubmissionId: number) {
    let reliabilities: OtherReliabilities[] | null = [];
    await this.otherReliabilitiesService
      .findAllBySubmissionId(taxSubmissionId)
      .then((e) => {
        reliabilities = e;
      });

    return new OtherReliabilitiesResponse(
      reliabilities?.map((o) => new OtherReliabilitiesViewModel(o)) ?? [],
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.otherReliabilitiesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateReliabilityDto: UpdateReliabilityDto,
  ) {
    return this.otherReliabilitiesService.update(+id, updateReliabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.otherReliabilitiesService.remove(+id);
  }
}