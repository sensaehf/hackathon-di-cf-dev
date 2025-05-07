import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize'
import { SubsidyService } from './subsidy.service';
import { Subsidy } from './subsidy.model';
import { LOGGER_PROVIDER } from '@island.is/logging';

describe('SubsidyService', () => {
  let service: SubsidyService;
  let subsidyMock: { findAll: jest.Mock; create: jest.Mock };  
  let loggerMock: { debug: jest.Mock };

  const mockSubmissions: Subsidy[] = [
    {
      id: 1,
      
    } as Subsidy,
    {
      id: 2,
      
    } as Subsidy,
  ];

  beforeEach(async () => {
    // Create mock implementations
    subsidyMock = {
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
                provide: getModelToken(Subsidy),
                useValue: subsidyMock
        },
        SubsidyService,        
        {
          provide: LOGGER_PROVIDER,
          useValue: loggerMock, // Mock Logger
        },
      ],
    }).compile();

    service = module.get<SubsidyService>(SubsidyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByTaxSubmissionId', () => {
    it('should find subsidies by submissionId and log debug message', async () => {
      // Mock data
      const taxSubmissionId = 12345;
     

      // Set up mocks
      (subsidyMock.findAll as jest.Mock).mockResolvedValue(mockSubmissions);

      // Call service method
      const result = await service.findByTaxSubmissionId(taxSubmissionId);

      // Assertions
      expect(result).toEqual(mockSubmissions);
      expect(subsidyMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      });
    });

    it('should return null if no subsidies are found', async () => {
      // Mock data
      const taxSubmissionId = 11;

      // Set up mocks
      (subsidyMock.findAll as jest.Mock).mockResolvedValue([]);

      // Call service method
      const result = await service.findByTaxSubmissionId(taxSubmissionId);

      // Assertions
      expect(result).toEqual([]);
      expect(subsidyMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      });
    });
  });

});
