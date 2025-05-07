import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { RealEstateService } from './realEstate.service'
import { RealEstate } from './realEstate.model'
import { RealEstateResponse } from './dto/realEstateResponse'
import { RealEstateViewModel } from './dto/realEstate.dto'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CreateRealEstateDto } from './dto/create-realEstate.dto'
import { UpdateRealEstateDto } from './dto/update-realEstate.dto'

@ApiTags('Real Estate')
@Controller('v1/tax-submissions/:taxSubmissionId/real-estates')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Post()
  create(@Body() createRealEstateDto: CreateRealEstateDto, @Param('taxSubmissionId') taxSubmissionId: number) {
    return this.realEstateService.create(createRealEstateDto, taxSubmissionId)
  }

  @ApiOkResponse({type: RealEstateResponse})
  @Get()
  async getByTaxSubmissionId(@Param('taxSubmissionId') taxSubmissionId: number) {
    let realEstates : RealEstate[] | null = [];
    await this.realEstateService.findAllByTaxSubmissionId(taxSubmissionId)
    .then((e) =>
    {
      realEstates = e
    })

    return new RealEstateResponse(realEstates?.map(o => new RealEstateViewModel(o)) ?? []);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realEstateService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRealEstateDto: UpdateRealEstateDto,
  ) {
    return this.realEstateService.update(id, updateRealEstateDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realEstateService.remove(id)
  }
}
