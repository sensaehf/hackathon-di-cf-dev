import { Resolver, Query, Args, Context } from '@nestjs/graphql'
import { Person } from './entities/person.entity'
import { NationalRegistryApi } from '../../../services/nationalRegistry'

@Resolver(() => Person)
export class PersonResolver {
  

  @Query(() => Person, { name: 'person', nullable: true })
  findOne(
    @Context('dataSources') { nationalRegistryApi }: { nationalRegistryApi: NationalRegistryApi },
    @Args('id', { type: () => String }) id: string) {
    
    const person = nationalRegistryApi.getPerson(id)
    console.log('Fetched person from API:', person);
    return person
  }
}
