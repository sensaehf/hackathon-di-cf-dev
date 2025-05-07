import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.model';
import { LOGGER_PROVIDER } from '@island.is/logging';
import { ConflictException } from '@nestjs/common';
import { UniqueConstraintError, ValidationErrorItem } from 'sequelize';
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
      taxSubmissionId: 2,
      currency: 'EUR',
      purchasePrice: 5000,
      purchaseYear: 2020,
    };

    it('should create a vehicle successfully', async () => {
      (vehicleMock.create as jest.Mock).mockResolvedValue(createDto);

      const result = await service.create(createDto);

      expect(result).toEqual(createDto);
      expect(vehicleMock.create).toHaveBeenCalledWith(createDto);
    });

    // it('should throw ConflictException on unique constraint violation', async () => {
    //   // Create a mock error that matches the class but doesn't call Sequelize internals
    //   class FakeUniqueConstraintError extends Error {}
    //   Object.setPrototypeOf(FakeUniqueConstraintError.prototype, UniqueConstraintError.prototype);
    
    //   const error = new FakeUniqueConstraintError('Simulated unique constraint error');
    //   Object.setPrototypeOf(error, UniqueConstraintError.prototype); // for instanceof check
    
    //   (vehicleMock.create as jest.Mock).mockRejectedValue(error);
    
    //   await expect(service.create(createDto)).rejects.toThrow(ConflictException);
    // });
  });
});
