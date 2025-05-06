import { Test, TestingModule } from '@nestjs/testing'
import { PensionsGrantsSubsidiesResolver } from './pensions-grants-subsidies.resolver'

describe('PensionsGrantsSubsidiesResolver', () => {
  let resolver: PensionsGrantsSubsidiesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PensionsGrantsSubsidiesResolver
      ],
    }).compile()

    resolver = module.get<PensionsGrantsSubsidiesResolver>(
      PensionsGrantsSubsidiesResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
