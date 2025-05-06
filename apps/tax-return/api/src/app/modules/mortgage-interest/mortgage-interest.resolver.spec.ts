import { Test, TestingModule } from '@nestjs/testing'
import { MortgageInterestResolver } from './mortgage-interest.resolver'

describe('MortgageInterestResolver', () => {
  let resolver: MortgageInterestResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MortgageInterestResolver],
    }).compile()

    resolver = module.get<MortgageInterestResolver>(MortgageInterestResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
