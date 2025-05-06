import { Test, TestingModule } from '@nestjs/testing'
import { MortgageService } from './mortgage.service'
import { Mortgage } from './mortgage.model'
import { getModelToken } from '@nestjs/sequelize'
import { LOGGER_PROVIDER } from '@island.is/logging'

describe('MortgageService', () => {
  let service: MortgageService
  let mortgageMock: { findAll: jest.Mock; create: jest.Mock };  
  let loggerMock: { debug: jest.Mock };

  beforeEach(async () => {
    mortgageMock = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    loggerMock = {
      debug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [MortgageService,
        {
          provide: getModelToken(Mortgage),
          useValue: mortgageMock
        },
        {
          provide: LOGGER_PROVIDER,
          useValue: loggerMock, // Mock Logger
        },
      ],

    }).compile()

    service = module.get<MortgageService>(MortgageService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
