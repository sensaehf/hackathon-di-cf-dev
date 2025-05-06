import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize'
import { TaxSubmissionService } from './taxSubmission.service';
import { TaxSubmission } from './taxSubmission.model';
import { LOGGER_PROVIDER } from '@island.is/logging';

describe('TaxSubmissionService', () => {
  let service: TaxSubmissionService;
  let taxSubmissionMock: typeof TaxSubmission;
  let loggerMock: { debug: jest.Mock };

  const mockSubmissions: TaxSubmission[] = [
    {
      id: 1,
      personId: 12345,
      taxYear: 2021,
      createdAt: new Date(),
    } as TaxSubmission,
    {
      id: 2,
      personId: 12345,
      taxYear: 2022,
      createdAt: new Date(),
    } as TaxSubmission,
  ];

  beforeEach(async () => {
    // Create mock implementations
    taxSubmissionMock = {
      findAll: jest.fn(),
      create: jest.fn(),
    } as any;

    loggerMock = {
      debug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports:[],
      providers: [
        {
                provide: getModelToken(TaxSubmission),
                useValue: {
                  create: jest.fn(),
                  findOne: jest.fn(),
                  findAll: jest.fn(),
                  update: jest.fn(),
                  count: jest.fn(),
                },
        },
        TaxSubmissionService,
        {
          provide: TaxSubmission,
          useValue: taxSubmissionMock, // Mock Sequelize model
        },
        {
          provide: LOGGER_PROVIDER,
          useValue: loggerMock, // Mock Logger
        },
      ],
    }).compile();

    service = module.get<TaxSubmissionService>(TaxSubmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByPersonId', () => {
    it('should find submissions by personId and log debug message', async () => {
      // Mock data
      const personId = 12345;
     

      // Set up mocks
      (taxSubmissionMock.findAll as jest.Mock).mockResolvedValue(mockSubmissions);

      // Call service method
      const result = await service.findByPersonId(personId);

      // Assertions
      expect(result).toEqual(mockSubmissions);
      expect(taxSubmissionMock.findAll).toHaveBeenCalledWith({
        where: { person_id: personId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding tax submissions for nationalId - "${personId}"`,
      );
    });

    it('should return null if no submissions are found', async () => {
      // Mock data
      const personId = 11;

      // Set up mocks
      (taxSubmissionMock.findAll as jest.Mock).mockResolvedValue([]);

      // Call service method
      const result = await service.findByPersonId(personId);

      // Assertions
      expect(result).toEqual([]);
      expect(taxSubmissionMock.findAll).toHaveBeenCalledWith({
        where: { person_id: personId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding tax submissions for nationalId - "${personId}"`,
      );
    });
  });

  // describe('create', () => {
  //   it('should create a new tax submission and log debug message', async () => {
  //     // Mock data
  //     const mockTaxSubmissionViewModel: TaxSubmissionViewModel = {
  //       personId: 12345,
  //       taxYear: 2022,
  //     };

  //     const mockCreatedSubmission: TaxSubmission = new TaxSubmission({
  //       person_id: mockTaxSubmissionViewModel.personId,
  //       tax_year: mockTaxSubmissionViewModel.taxYear,
  //     });

  //     // Set up mocks
  //     (taxSubmissionMock.create as jest.Mock).mockResolvedValue(mockCreatedSubmission);

  //     // Call service method
  //     const result = await service.create(mockTaxSubmissionViewModel);

  //     // Assertions
  //     expect(result).toEqual(mockCreatedSubmission);
  //     expect(taxSubmissionMock.create).toHaveBeenCalledWith({
  //       person_id: mockTaxSubmissionViewModel.personId,
  //       tax_year: mockTaxSubmissionViewModel.taxYear,
  //     });
  //     expect(loggerMock.debug).toHaveBeenCalledWith(
  //       `Creating tax submission with person id - ${mockTaxSubmissionViewModel.personId} and tax year ${mockTaxSubmissionViewModel.taxYear}`,
  //     );
  //   });
  // });
});
