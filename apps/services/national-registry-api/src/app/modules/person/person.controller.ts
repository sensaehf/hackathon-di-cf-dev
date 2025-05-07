import {
  BadRequestException,
  Controller,
  Get,
  Headers  
} from '@nestjs/common'
import { PersonService } from './person.service'

@Controller('v1/persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findOne(@Headers('x-query-national-id') id: string) {

    
    if (id == null)
      throw new BadRequestException('National Id is missing')

    return this.personService.findOne(id)
  }

 
}
