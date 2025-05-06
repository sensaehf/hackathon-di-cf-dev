import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { VehicleViewModel } from './dto/vehicleViewModel.dto';
import { Vehicle } from './vehicle.model';

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            findByTaxSubmissionId: jest.fn(), // Mock the VehicleService method
          },
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return vehicles mapped to view models', async () => {
    // Mock data
    const taxSubmissionId = 12345;
    const mockVehicles: Vehicle[] = [
      {
        id: 'MY 043',
        taxSubmissionId: 123456,
        currency: 'ISK',
      } as Vehicle,
      {
        id: 'FMH 41',
        taxSubmissionId: 123456,
        currency: 'EUR',
      } as Vehicle,
    ];

    // Mock the service behavior
    jest.spyOn(service, 'findByTaxSubmissionId').mockResolvedValue(mockVehicles);

    // Call the controller method
    const result = await controller.getByTaxSubmissionId(taxSubmissionId);

    // Assert that the result matches expectations
    expect(result).toEqual({
     "vehicles": mockVehicles.map((vehicle) => new VehicleViewModel(vehicle)),
    });
    expect(service.findByTaxSubmissionId).toHaveBeenCalledWith(taxSubmissionId); // Ensure the service method is called correctly
  });

  it('should handle an empty result gracefully', async () => {
    // Mock data
    const taxSubmissionId = 54321;

    // Mock the service to return null
    jest.spyOn(service, 'findByTaxSubmissionId').mockResolvedValue(null);

    // Call the controller method
    const result = await controller.getByTaxSubmissionId(taxSubmissionId);

    // Assert the empty mapping
    expect(result).toEqual( { vehicles: []}); // Should return an empty array
    expect(service.findByTaxSubmissionId).toHaveBeenCalledWith(taxSubmissionId);
  });
});
