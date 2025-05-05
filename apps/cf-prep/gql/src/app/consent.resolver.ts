import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ConsentService } from './consent.service'
import { Consent } from './entities/consent.entity'
import { CreateConsentInput } from './dto/create-consent.input'
import { UpdateConsentInput } from './dto/update-consent.input'

@Resolver(() => Consent)
export class ConsentResolver {
  constructor(private readonly consentService: ConsentService) {}

  // @Mutation(() => Consent)
  // createConsent(
  //   @Args('createConsentInput') createConsentInput: CreateConsentInput,
  // ) {
  //   return this.consentService.create(createConsentInput)
  // }

  // @Query(() => [Consent], { name: 'consent' })
  // findAll() {
  //   return this.consentService.findAll()
  // }

  @Query(() => Consent, { name: 'consent' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.consentService.findOne(id)
  }

  // @Mutation(() => Consent)
  // updateConsent(
  //   @Args('updateConsentInput') updateConsentInput: UpdateConsentInput,
  // ) {
  //   return this.consentService.update(updateConsentInput.id, updateConsentInput)
  // }

  // @Mutation(() => Consent)
  // removeConsent(@Args('id', { type: () => Int }) id: number) {
  //   return this.consentService.remove(id)
  // }
}
