import { Test, TestingModule } from '@nestjs/testing'
import { MortgageService } from './mortgage.service'
import { Mortgage } from './mortgage.model'
import { getModelToken } from '@nestjs/sequelize'
import { LOGGER_PROVIDER } from '@island.is/logging'

describe('MortgageService', () => {
  let service: MortgageService
  let mortgageMock: { findAll: jest.Mock; create: jest.Mock; findByPk?: jest.Mock; update?: jest.Mock; destroy?: jest.Mock };  
  let loggerMock: { debug: jest.Mock };
  let module: TestingModule

  beforeAll(async () => {
    mortgageMock = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    loggerMock = {
      debug: jest.fn(),
    };

    module = await Test.createTestingModule({
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

  afterAll(async () => {
    await module.close()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a mortgage and return it', async () => {
      const createMortgageDto = {
        id: '1',
        lenderName: 'Bank',
        type: 'Home',
        description: 'Mortgage for home',
        startDate: new Date(),
        termYears: 30,
        purchaseYear: 2025,
        totalAnnualPayments: 12000,
        principalRepayment: 10000,
        interestAmount: 2000,
        outstandingBalance: 300000,
        currency: 'USD',
      };
      const taxSubmissionId = 1;
      const mockMortgage = { ...createMortgageDto, taxSubmissionId };

      mortgageMock.create.mockResolvedValue(mockMortgage);

      const result = await service.create(createMortgageDto, taxSubmissionId);

      expect(mortgageMock.create).toHaveBeenCalledWith({
        ...createMortgageDto,
        taxSubmissionId,
      });
      expect(result).toEqual(mockMortgage);
    });
  });

  describe('findAllBySubmissionId', () => {
    it('should return all mortgages for a given submission ID', async () => {
      const submissionId = 1;
      const mockMortgages = [{ id: '1', taxSubmissionId: submissionId }];

      mortgageMock.findAll.mockResolvedValue(mockMortgages);

      const result = await service.findAllBySubmissionId(submissionId);

      expect(mortgageMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId: submissionId },
      });
      expect(result).toEqual(mockMortgages);
    });
  });

  describe('findOne', () => {
    it('should return a mortgage by ID', async () => {
      const id = '1';
      const mockMortgage = { id } as Mortgage;

      mortgageMock.findByPk = jest.fn().mockResolvedValue(mockMortgage);

      const result = await service.findOne(id);

      expect(mortgageMock.findByPk).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockMortgage);
    });
  });

  describe('update', () => {
    it('should update a mortgage and return the updated entity', async () => {
      const id = '1';
      const updateMortgageDto = { id: '1', lenderName: 'Updated Bank' };
      const mockUpdatedMortgage = { ...updateMortgageDto };

      mortgageMock.update = jest.fn().mockResolvedValue([1]);
      mortgageMock.findByPk = jest.fn().mockResolvedValue(mockUpdatedMortgage);

      const result = await service.update(id, updateMortgageDto);

      expect(mortgageMock.update).toHaveBeenCalledWith(updateMortgageDto, {
        where: { id },
      });
      expect(mortgageMock.findByPk).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUpdatedMortgage);
    });
  });

  describe('remove', () => {
    it('should delete a mortgage by ID', async () => {
      const id = '1';

      mortgageMock.destroy = jest.fn().mockResolvedValue(1);

      const result = await service.remove(id);

      expect(mortgageMock.destroy).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(1);
    });
  });
});
