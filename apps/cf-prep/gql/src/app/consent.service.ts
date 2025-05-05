import { Injectable } from '@nestjs/common'
import { CreateConsentInput } from './dto/create-consent.input'
import { UpdateConsentInput } from './dto/update-consent.input'

@Injectable()
export class ConsentService {
  // create(createConsentInput: CreateConsentInput) {
  //   return 'This action adds a new consent'
  // }

  // findAll() {
  //   return `This action returns all consent`
  // }

  findOne(id: number) {
    return { id , nationalId: '123456789', consent: true, created: '2023-10-01', modified: '2023-10-01' }
  }

  // update(id: number, updateConsentInput: UpdateConsentInput) {
  //   return `This action updates a #${id} consent`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} consent`
  // }
}
