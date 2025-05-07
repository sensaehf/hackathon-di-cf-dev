import { Inject, Injectable } from '@nestjs/common'
import { Person } from './entities/person.entity'
import { Logger, LOGGER_PROVIDER } from '@island.is/logging'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class PersonService {

  constructor(
    @InjectModel(Person)
    private person: typeof Person,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}
  
  async findOne(id: string) {
    this.logger.debug(`Getting person with national id ${id}`)

    const person = await this.person.findByPk(id)

    return person

  }
 
}
