import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize'
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.model';
import { LOGGER_PROVIDER } from '@island.is/logging';

describe('VehicleService', () => {
  let service: VehicleService;
  let vehicleMock: { findAll: jest.Mock; create: jest.Mock };  
  let loggerMock: { debug: jest.Mock };

  const mockSubmissions: Vehicle[] = [
    {
      id: 'my 12a',
      taxSubmissionId: 1,
      currency: 'ISK',
      purchasePrice: 1000019,
      purchaseYear: 2019
      
    } as Vehicle,
    {
      id: 'EF50418',
      taxSubmissionId: 1,
      currency: 'NOK',
      purchasePrice: 10001,
      purchaseYear: 2023
    } as Vehicle,
  ];

  beforeEach(async () => {
    // Create mock implementations
    vehicleMock = {
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
                provide: getModelToken(Vehicle),
                useValue: vehicleMock
        },
        VehicleService,        
        {
          provide: LOGGER_PROVIDER,
          useValue: loggerMock, // Mock Logger
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByTaxSubmissionId', () => {
    it('should find vehicles by submissionId and log debug message', async () => {
      // Mock data
      const taxSubmissionId = 12345;
     

      // Set up mocks
      (vehicleMock.findAll as jest.Mock).mockResolvedValue(mockSubmissions);

      // Call service method
      const result = await service.findByTaxSubmissionId(taxSubmissionId);

      // Assertions
      expect(result).toEqual(mockSubmissions);
      expect(vehicleMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding vehicles for taxSubmissionId - "${taxSubmissionId}"`,
      );
    });

    it('should return null if no vehicles are found', async () => {
      // Mock data
      const taxSubmissionId = 11;

      // Set up mocks
      (vehicleMock.findAll as jest.Mock).mockResolvedValue([]);

      // Call service method
      const result = await service.findByTaxSubmissionId(taxSubmissionId);

      // Assertions
      expect(result).toEqual([]);
      expect(vehicleMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding vehicles for taxSubmissionId - "${taxSubmissionId}"`,
      );
    });
  });

});
