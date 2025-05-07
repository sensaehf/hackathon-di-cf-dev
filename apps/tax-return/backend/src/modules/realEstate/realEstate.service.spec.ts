import { Test, TestingModule } from '@nestjs/testing'
import { RealEstateService } from './realEstate.service'
import { RealEstate } from './realEstate.model';
import { getModelToken } from '@nestjs/sequelize';
import { LOGGER_PROVIDER } from '@island.is/logging';

describe('RealEstateService', () => {
  let service: RealEstateService
  let RealEstateMock: { findAll: jest.Mock; create: jest.Mock }
  let loggerMock: { debug: jest.Mock }
  let module: TestingModule

  const mockSubmissions: RealEstate[] = [
    {
      id: '1',
      taxSubmissionId: 12345,
      address: 'Gámagata 42',
      assessedValue: 10,
      currency: 'ISK',
    } as RealEstate,
    {
      id: '2',
      taxSubmissionId: 12345,
      address: 'Gámagata 42',
      assessedValue: 10,
      currency: 'ISK',
    } as RealEstate,
  ]

  beforeAll(async () => {
    RealEstateMock = {
      findAll: jest.fn(),
      create: jest.fn(),
    }

    loggerMock = {
      debug: jest.fn(),
    }

    module = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(RealEstate),
          useValue: RealEstateMock,
        },
        RealEstateService,
        {
          provide: LOGGER_PROVIDER,
          useValue: loggerMock,
        },
      ],
    }).compile()

    service = module.get<RealEstateService>(RealEstateService)
  })

  afterAll(async () => {
    await module.close()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findByTaxSubmissionId', () => {
    it('should find real estates by submissionId and log debug message', async () => {
      const taxSubmissionId = 12345

      RealEstateMock.findAll.mockResolvedValue(mockSubmissions)

      const result = await service.findAllByTaxSubmissionId(taxSubmissionId)

      expect(result).toEqual(mockSubmissions)
      expect(RealEstateMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      })
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding real estates for taxSubmissionId - "${taxSubmissionId}"`,
      )
    })

    it('should return empty array if no submissions are found', async () => {
      const taxSubmissionId = 11

      RealEstateMock.findAll.mockResolvedValue([])

      const result = await service.findAllByTaxSubmissionId(taxSubmissionId)

      expect(result).toEqual([])
      expect(RealEstateMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      })
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding real estates for taxSubmissionId - "${taxSubmissionId}"`,
      )
    })
  })

  describe('create', () => {
    const taxSubmissionId = 777
    const createDto = {
      id: '3',
      address: 'Laugavegur 50',
      assessedValue: 250,
      currency: 'ISK',
    }

    it('should create a real estate and log debug message', async () => {
      const mockCreated: RealEstate = {
        id: createDto.id,
        taxSubmissionId,
        address: createDto.address,
        assessedValue: createDto.assessedValue,
        currency: createDto.currency,
      } as RealEstate

      RealEstateMock.create.mockResolvedValue(mockCreated)

      const result = await service.create(createDto as any, taxSubmissionId)

      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Creating real estate with id - ${createDto.id}`,
      )
      expect(RealEstateMock.create).toHaveBeenCalledWith({
        id: createDto.id,
        taxSubmissionId,
        address: createDto.address,
        assessedValue: createDto.assessedValue,
        currency: createDto.currency,
      })
      expect(result).toEqual(mockCreated)
    })

    it('should log and throw when model.create throws synchronously', () => {
      const error = new Error('Sync create failure')
      RealEstateMock.create.mockImplementation(() => { throw error })

      expect(() => service.create(createDto as any, taxSubmissionId)).toThrow(error)

      expect(loggerMock.debug).toHaveBeenCalledTimes(2)
      expect(loggerMock.debug).toHaveBeenNthCalledWith(
        1,
        `Creating real estate with id - ${createDto.id}`,
      )
      expect(loggerMock.debug).toHaveBeenNthCalledWith(
        2,
        'Error creating real estate property',
        error,
      )
    })

    it('should propagate async errors from model.create', async () => {
      const error = new Error('Async create failure')
      RealEstateMock.create.mockRejectedValue(error)

      await expect(service.create(createDto as any, taxSubmissionId)).rejects.toThrow(error)

      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Creating real estate with id - ${createDto.id}`,
      )
    })
  })
})
