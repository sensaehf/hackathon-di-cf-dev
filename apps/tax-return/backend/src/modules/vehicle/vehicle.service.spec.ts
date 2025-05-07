import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.model';
import { LOGGER_PROVIDER } from '@island.is/logging';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

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
      purchaseYear: 2019,
    } as Vehicle,
    {
      id: 'EF50418',
      taxSubmissionId: 1,
      currency: 'NOK',
      purchasePrice: 10001,
      purchaseYear: 2023,
    } as Vehicle,
  ];

  beforeEach(async () => {
    vehicleMock = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    loggerMock = {
      debug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Vehicle),
          useValue: vehicleMock,
        },
        VehicleService,
        {
          provide: LOGGER_PROVIDER,
          useValue: loggerMock,
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
      const taxSubmissionId = 12345;

      (vehicleMock.findAll as jest.Mock).mockResolvedValue(mockSubmissions);

      const result = await service.findByTaxSubmissionId(taxSubmissionId);

      expect(result).toEqual(mockSubmissions);
      expect(vehicleMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding vehicles for taxSubmissionId - "${taxSubmissionId}"`,
      );
    });

    it('should return null if no vehicles are found', async () => {
      const taxSubmissionId = 11;

      (vehicleMock.findAll as jest.Mock).mockResolvedValue([]);

      const result = await service.findByTaxSubmissionId(taxSubmissionId);

      expect(result).toEqual([]);
      expect(vehicleMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding vehicles for taxSubmissionId - "${taxSubmissionId}"`,
      );
    });
  });

  describe('create', () => {
    const createDto: CreateVehicleDto = {
      id: 'DEF456',      
      currency: 'EUR',
      purchasePrice: 5000,
      purchaseYear: 2020,      
    };

    const taxSubmissionId = 2

    it('should create a vehicle successfully', async () => {
      (vehicleMock.create as jest.Mock).mockResolvedValue(createDto);

      const result = await service.create(createDto, taxSubmissionId);

      expect(result).toEqual(createDto);
      expect(vehicleMock.create).toHaveBeenCalledWith({
        id: 'DEF456',      
        currency: 'EUR',
        purchasePrice: 5000,
        purchaseYear: 2020,
        taxSubmissionId: 2     
      });
    });
  });
});
