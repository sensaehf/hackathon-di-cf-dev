import { Test, TestingModule } from '@nestjs/testing'
import { RealEstateController } from './realEstate.controller'
import { RealEstateService } from './realEstate.service'

describe('RealEstateController', () => {
  let controller: RealEstateController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealEstateController],
      providers: [RealEstateService],
    }).compile()

    controller = module.get<RealEstateController>(RealEstateController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
