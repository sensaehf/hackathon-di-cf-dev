import { Test, TestingModule } from '@nestjs/testing'
import { MortgageController } from './mortgage.controller'
import { MortgageService } from './mortgage.service'

describe('MortgageController', () => {
  let controller: MortgageController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MortgageController],
      providers: [MortgageService],
    }).compile()

    controller = module.get<MortgageController>(MortgageController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
