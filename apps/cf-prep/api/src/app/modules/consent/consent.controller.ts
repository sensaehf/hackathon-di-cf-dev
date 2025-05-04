import { Controller, Get } from '@nestjs/common'

import { ConsentService } from './consent.service'

@Controller()
export class ConsentController {
  constructor(private readonly concentService: ConsentService) {}

  @Get()
  getData() {
    return this.concentService.findByNationalId('1234567890');
  }
}
