import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { MortgageService } from './mortgage.service'
import { CreateMortgageDto } from './dto/create-mortgage.dto'
import { UpdateMortgageDto } from './dto/update-mortgage.dto'
import { Mortgage } from './mortgage.model'
import { MortgageResponse } from './dto/mortgageResponse'
import { MortgageViewModel } from './dto/mortgage.dto'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Mortgage')
@Controller('v1/tax-submissions/:taxSubmissionId/mortgages')
export class MortgageController {
  constructor(private readonly mortgageService: MortgageService) {}

  @Post()
  create(@Body() createMortgageDto: CreateMortgageDto, @Param('taxSubmissionId') taxSubmissionId: number) {
    return this.mortgageService.create(createMortgageDto, taxSubmissionId)
  }

  @ApiOkResponse({type: MortgageResponse})
  @Get()
  async findAll(@Param('taxSubmissionId') taxSubmissionId: number) {
    let mortgages : Mortgage[] | null = [];
    await this.mortgageService.findAllBySubmissionId(taxSubmissionId)
    .then((e) =>
    {
      mortgages = e
    })

    return new MortgageResponse(mortgages?.map(o => new MortgageViewModel(o)) ?? []);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mortgageService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMortgageDto: UpdateMortgageDto,
  ) {
    return this.mortgageService.update(+id, updateMortgageDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mortgageService.remove(+id)
  }
}
