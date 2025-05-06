import { Test, TestingModule } from '@nestjs/testing'
import { PerDiemAndPerksResolver } from './per-diem-and-perks.resolver'

describe('PerDiemAndPerksResolver', () => {
  let resolver: PerDiemAndPerksResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerDiemAndPerksResolver],
    }).compile()

    resolver = module.get<PerDiemAndPerksResolver>(PerDiemAndPerksResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
