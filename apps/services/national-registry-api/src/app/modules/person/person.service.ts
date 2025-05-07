import { Injectable } from '@nestjs/common'
import { Person } from './entities/person.entity'

@Injectable()
export class PersonService {
  
  findOne(id: number) {
    const person = new Person()
    person.name = 'Jökull Þórðarson'
    person.nationalId = '120389-4569'
    person.address =	'Bláfjallagata 12, 105 Reykjavík'
    person.email = 'jokull.thordarson@email.is'
    person.phoneNumber = '772-8391' 
    return person
  }
 
}
