import { Test, TestingModule } from '@nestjs/testing'
import { OtherReliabilitiesResolver } from './other-reliabilities.resolver'

describe('OtherReliabilitiesResolver', () => {
  let resolver: OtherReliabilitiesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtherReliabilitiesResolver],
    }).compile()

    resolver = module.get<OtherReliabilitiesResolver>(
      OtherReliabilitiesResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
