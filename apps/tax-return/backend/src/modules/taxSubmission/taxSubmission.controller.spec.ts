import { Test, TestingModule } from '@nestjs/testing'

import { TaxSubmissionController } from './taxSubmission.controller'
import { TaxSubmissionService } from './taxSubmission.service'

describe('TaxSubmissionController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TaxSubmissionController],
      providers: [TaxSubmissionService],
    }).compile()
  })

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<TaxSubmissionController>(TaxSubmissionController)
      expect(appController.getById( 1,  2 )).toEqual({ message: 'Hello API' })
    })
  })
})
