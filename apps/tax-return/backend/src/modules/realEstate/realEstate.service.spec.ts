import { Test, TestingModule } from '@nestjs/testing'
import { RealEstateService } from './realEstate.service'
import { RealEstate } from './realEstate.model';
import { getModelToken } from '@nestjs/sequelize';
import { LOGGER_PROVIDER } from '@island.is/logging';
import { CreateRealEstateDto } from './dto/create-realEstate.dto';

describe('RealEstateService', () => {
  let service: RealEstateService
  let RealEstateMock: { findAll: jest.Mock; create: jest.Mock; findByPk: jest.Mock; update: jest.Mock; destroy: jest.Mock }
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
      findByPk: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
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

  // describe('create', () => {
  //   const taxSubmissionId = 777
  //   const createDto = {
  //     id: '3',
  //     address: 'Laugavegur 50',
  //     assessedValue: 250,
  //     currency: 'ISK',
  //   }

  //   it('should create a real estate and log debug message', async () => {
  //     const mockCreated: RealEstate = {
  //       id: createDto.id,
  //       taxSubmissionId,
  //       address: createDto.address,
  //       assessedValue: createDto.assessedValue,
  //       currency: createDto.currency,
  //     } as RealEstate

  //     RealEstateMock.create.mockResolvedValue(mockCreated)

  //     const result = await service.create(createDto as CreateRealEstateDto, taxSubmissionId)

  //     expect(loggerMock.debug).toHaveBeenCalledWith(
  //       `Creating real estate with id - ${createDto.id}`,
  //     )
  //     expect(RealEstateMock.create).toHaveBeenCalledWith({
  //       id: createDto.id,
  //       taxSubmissionId,
  //       address: createDto.address,
  //       assessedValue: createDto.assessedValue,
  //       currency: createDto.currency,
  //     })
  //     expect(result).toEqual(mockCreated)
  //   })

  //   it('should log and throw when model.create throws synchronously', () => {
  //     const error = new Error('Sync create failure')
  //     RealEstateMock.create.mockImplementation(() => { throw error })

  //     expect(() => service.create(createDto as CreateRealEstateDto, taxSubmissionId)).toThrow(error)

  //     expect(loggerMock.debug).toHaveBeenCalledTimes(2)
  //     expect(loggerMock.debug).toHaveBeenNthCalledWith(
  //       1,
  //       `Creating real estate with id - ${createDto.id}`,
  //     )
  //     expect(loggerMock.debug).toHaveBeenNthCalledWith(
  //       2,
  //       'Error creating real estate property',
  //       error,
  //     )
  //   })

  //   it('should propagate async errors from model.create', async () => {
  //     const error = new Error('Async create failure')
  //     RealEstateMock.create.mockRejectedValue(error)

  //     await expect(service.create(createDto as CreateRealEstateDto, taxSubmissionId)).rejects.toThrow(error)

  //     expect(loggerMock.debug).toHaveBeenCalledWith(
  //       `Creating real estate with id - ${createDto.id}`,
  //     )
  //   })
  // })

  describe('findOne', () => {
    it('should return a real estate by ID', async () => {
      const id = '1';
      const mockRealEstate: RealEstate = {
        id: '1',
        taxSubmissionId: 12345,
        address: 'Gámagata 42',
        assessedValue: 10,
        currency: 'ISK',
      } as RealEstate;

      RealEstateMock.findByPk = jest.fn().mockResolvedValue(mockRealEstate);

      const result = await service.findOne(id);

      expect(RealEstateMock.findByPk).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockRealEstate);
    });

    it('should return null if no real estate is found', async () => {
      const id = '2';

      RealEstateMock.findByPk = jest.fn().mockResolvedValue(null);

      const result = await service.findOne(id);

      expect(RealEstateMock.findByPk).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });
  });

  // describe('update', () => {
  //   it('should update a real estate and return the updated entity', async () => {
  //     const id = '1';
  //     const updateDto = { address: 'Updated Address' };
  //     const mockUpdatedRealEstate = { id, ...updateDto };

  //     RealEstateMock.update = jest.fn().mockResolvedValue([1]);
  //     RealEstateMock.findByPk = jest.fn().mockResolvedValue(mockUpdatedRealEstate);

  //     const result = await service.update(id, updateDto);

  //     expect(RealEstateMock.update).toHaveBeenCalledWith(updateDto, {
  //       where: { id },
  //     });
  //     expect(RealEstateMock.findByPk).toHaveBeenCalledWith(id);
  //     expect(result).toEqual(mockUpdatedRealEstate);
  //   });

  //   it('should return null if no rows are updated', async () => {
  //     const id = '2';
  //     const updateDto = { address: 'Updated Address' };

  //     RealEstateMock.update = jest.fn().mockResolvedValue([0]);

  //     const result = await service.update(id, updateDto);

  //     expect(RealEstateMock.update).toHaveBeenCalledWith(updateDto, {
  //       where: { id },
  //     });
  //     expect(result).toBeNull();
  //   });
  // });

  describe('remove', () => {
    it('should delete a real estate by ID', async () => {
      const id = '1';

      RealEstateMock.destroy = jest.fn().mockResolvedValue(1);

      const result = await service.remove(id);

      expect(RealEstateMock.destroy).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(1);
    });

    it('should return 0 if no rows are deleted', async () => {
      const id = '2';

      RealEstateMock.destroy = jest.fn().mockResolvedValue(0);

      const result = await service.remove(id);

      expect(RealEstateMock.destroy).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(0);
    });
  });
})
