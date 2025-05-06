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

@ApiTags('realEstate')
@Controller('v1/tax-submissions/:taxSubmissionId/real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Post()
  create(@Body() createRealEstateDto: RealEstateViewModel) {
    return this.realEstateService.create(createRealEstateDto)
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
    return this.realEstateService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRealEstateDto: RealEstateViewModel,
  ) {
    return this.realEstateService.update(+id, updateRealEstateDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realEstateService.remove(+id)
  }
}
