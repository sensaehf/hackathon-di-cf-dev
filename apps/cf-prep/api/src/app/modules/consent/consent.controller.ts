import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { ConsentService } from './consent.service'
import { ApiResponse } from '@nestjs/swagger';
import { ConsentDto } from './dto/consent.dto';
import { CreateConsentParams } from './dto/params.dto';

@Controller()
export class ConsentController {
  constructor(private readonly consentService: ConsentService) {}

  @Get()
  getData() {
    return this.consentService.findByNationalId('1234567890');
  }

  @Get('consent/:nationalId')
  getById(
    @Param() params : CreateConsentParams
  ) {
    return this.consentService.findByNationalId(params.nationalId);
  }

  @Post('consent/')
  @ApiResponse({
    status: 201,
    description: 'Consent created',
  })
  @ApiResponse({
    status: 400,
    description:
      'Something wrong',
  })
  create(
    @Body() body : ConsentDto
  ){
    return this.consentService.create(body);
  }
}
