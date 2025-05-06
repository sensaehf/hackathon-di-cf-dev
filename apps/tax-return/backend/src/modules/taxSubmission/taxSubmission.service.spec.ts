import { Test } from '@nestjs/testing'

import { TaxSubmissionService } from './taxSubmission.service'

describe('TaxSubmissionService', () => {
  let service: TaxSubmissionService

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TaxSubmissionService],
    }).compile()

    service = app.get<TaxSubmissionService>(TaxSubmissionService)
  })

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getById(1, 1234)).toEqual({ message: 'Hello API' })
    })
  })
})
