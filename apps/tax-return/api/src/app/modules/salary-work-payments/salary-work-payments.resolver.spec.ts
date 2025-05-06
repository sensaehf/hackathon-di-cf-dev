import { Test, TestingModule } from '@nestjs/testing'
import { SalaryWorkPaymentsResolver } from './salary-work-payments.resolver'

describe('SalaryWorkPaymentsResolver', () => {
  let resolver: SalaryWorkPaymentsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryWorkPaymentsResolver],
    }).compile()

    resolver = module.get<SalaryWorkPaymentsResolver>(
      SalaryWorkPaymentsResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
