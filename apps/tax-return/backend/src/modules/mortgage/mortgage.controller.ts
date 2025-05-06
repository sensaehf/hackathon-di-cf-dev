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

@Controller('mortgage')
export class MortgageController {
  constructor(private readonly mortgageService: MortgageService) {}

  @Post()
  create(@Body() createMortgageDto: CreateMortgageDto) {
    return this.mortgageService.create(createMortgageDto)
  }

  @Get()
  findAll() {
    return this.mortgageService.findAll()
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
