import { Test, TestingModule } from '@nestjs/testing'
import { RealEstateResolver } from './real-estate.resolver'

describe('RealEstateResolver', () => {
  let resolver: RealEstateResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealEstateResolver],
    }).compile()

    resolver = module.get<RealEstateResolver>(RealEstateResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
