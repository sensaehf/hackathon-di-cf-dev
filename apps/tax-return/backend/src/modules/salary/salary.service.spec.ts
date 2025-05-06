import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize'
import { SalaryService } from './salary.service';
import { Salary } from './salary.model';
import { LOGGER_PROVIDER } from '@island.is/logging';

describe('SalaryService', () => {
  let service: SalaryService;
  let salaryMock: { findAll: jest.Mock; create: jest.Mock };  
  let loggerMock: { debug: jest.Mock };

  const mockSubmissions: Salary[] = [
    {
      id: 1,
      taxSubmissionId: 123,
      amount: 100001,
      employerName: 'Gullfoss EHF',
      description: 'Its something else'
    } as Salary,
    {
      id: 2,
      taxSubmissionId: 123,
      amount: 12209,
      employerName: 'Grindavik Consulting'
    } as Salary,
  ];

  beforeEach(async () => {
    // Create mock implementations
    salaryMock = {
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
                provide: getModelToken(Salary),
                useValue: salaryMock
        },
        SalaryService,        
        {
          provide: LOGGER_PROVIDER,
          useValue: loggerMock, // Mock Logger
        },
      ],
    }).compile();

    service = module.get<SalaryService>(SalaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByTaxSubmissionId', () => {
    it('should find salaries by submissionId and log debug message', async () => {
      // Mock data
      const taxSubmissionId = 12345;
     

      // Set up mocks
      (salaryMock.findAll as jest.Mock).mockResolvedValue(mockSubmissions);

      // Call service method
      const result = await service.findByTaxSubmissionId(taxSubmissionId);

      // Assertions
      expect(result).toEqual(mockSubmissions);
      expect(salaryMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding salaries for taxSubmissionId - "${taxSubmissionId}"`,
      );
    });

    it('should return null if no submissions are found', async () => {
      // Mock data
      const taxSubmissionId = 11;

      // Set up mocks
      (salaryMock.findAll as jest.Mock).mockResolvedValue([]);

      // Call service method
      const result = await service.findByTaxSubmissionId(taxSubmissionId);

      // Assertions
      expect(result).toEqual([]);
      expect(salaryMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding salaries for taxSubmissionId - "${taxSubmissionId}"`,
      );
    });
  });

});
