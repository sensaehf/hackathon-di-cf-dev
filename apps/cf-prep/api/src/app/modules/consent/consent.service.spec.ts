import { Test } from '@nestjs/testing'

import { ConsentService } from './consent.service'

describe('AppService', () => {
  let service: ConsentService

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ConsentService],
    }).compile()

    service = app.get<ConsentService>(ConsentService)
  })

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' })
    })
  })
})
