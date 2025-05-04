import { Test, TestingModule } from '@nestjs/testing'

import { ConsentController } from './consent.controller'
import { ConsentService } from './consent.service'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ConsentController],
      providers: [ConsentService],
    }).compile()
  })

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<ConsentController>(ConsentController)
      expect(appController.getData()).toEqual({ message: 'Hello API' })
    })
  })
})
