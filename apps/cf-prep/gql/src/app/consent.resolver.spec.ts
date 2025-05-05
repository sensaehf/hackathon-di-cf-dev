import { Test, TestingModule } from '@nestjs/testing'
import { ConsentResolver } from './consent.resolver'
import { ConsentService } from './consent.service'

describe('ConsentResolver', () => {
  let resolver: ConsentResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsentResolver, ConsentService],
    }).compile()

    resolver = module.get<ConsentResolver>(ConsentResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
