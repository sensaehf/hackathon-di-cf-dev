import { Test, TestingModule } from '@nestjs/testing'
import { RealEstateService } from './realEstate.service'
import { RealEstate } from './realEstate.model';
import { getModelToken } from '@nestjs/sequelize';
import { LOGGER_PROVIDER } from '@island.is/logging';

describe('RealEstateService', () => {
  let service: RealEstateService;
  let RealEstateMock: { findAll: jest.Mock; create: jest.Mock };  
  let loggerMock: { debug: jest.Mock };

  const mockSubmissions: RealEstate[] = [
    {
      id: "1",
      taxSubmissionId: 12345,
      address: "Gámagata 42",
      assessedValue: 10,
      currency: "ISK",
    } as RealEstate,
    {
      id: "2",
      taxSubmissionId: 12345,
      address: "Gámagata 42",
      assessedValue: 10,
      currency: "ISK",
    } as RealEstate,
  ];

  beforeEach(async () => {
    // Create mock implementations
    RealEstateMock = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    loggerMock = {
      debug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports:[],
      providers: [
        {
                provide: getModelToken(RealEstate),
                useValue: RealEstateMock
        },
        RealEstateService,        
        {
          provide: LOGGER_PROVIDER,
          useValue: loggerMock, // Mock Logger
        },
      ],
    }).compile();

    service = module.get<RealEstateService>(RealEstateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByTaxSubmissionId', () => {
    it('should find real estates by submissionId and log debug message', async () => {
      // Mock data
      const taxSubmissionId = 12345;
     

      // Set up mocks
      (RealEstateMock.findAll as jest.Mock).mockResolvedValue(mockSubmissions);

      // Call service method
      const result = await service.findAllByTaxSubmissionId(taxSubmissionId);

      // Assertions
      expect(result).toEqual(mockSubmissions);
      expect(RealEstateMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding real estates for taxSubmissionId - "${taxSubmissionId}"`,
      );
    });

    it('should return null if no submissions are found', async () => {
      // Mock data
      const taxSubmissionId = 11;

      // Set up mocks
      (RealEstateMock.findAll as jest.Mock).mockResolvedValue([]);

      // Call service method
      const result = await service.findAllByTaxSubmissionId(taxSubmissionId);

      // Assertions
      expect(result).toEqual([]);
      expect(RealEstateMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding real estates for taxSubmissionId - "${taxSubmissionId}"`,
      );
    });
  });

})
