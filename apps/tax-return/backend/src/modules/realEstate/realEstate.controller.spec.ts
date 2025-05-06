import { Test, TestingModule } from '@nestjs/testing'
import { RealEstateController } from './realEstate.controller'
import { RealEstateService } from './realEstate.service'
import { RealEstateViewModel } from './dto/realEstate.dto';
import { RealEstate } from './realEstate.model';

describe('RealEstateController', () =>  {
  let controller: RealEstateController;
  let service: RealEstateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealEstateController],
      providers: [
        {
          provide: RealEstateService,
          useValue: {
            findAllByTaxSubmissionId: jest.fn(), // Mock the RealEstateService method
          },
        },
      ],
    }).compile();

    controller = module.get<RealEstateController>(RealEstateController);
    service = module.get<RealEstateService>(RealEstateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return real estates mapped to view models', async () => {
    // Mock data
    const taxSubmissionId = 12345;
    const mockRealEstates: RealEstate[] = [
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

    // Mock the service behavior
    jest.spyOn(service, 'findAllByTaxSubmissionId').mockResolvedValue(mockRealEstates);

    // Call the controller method
    const result = await controller.getByTaxSubmissionId(taxSubmissionId);

    // Assert that the result matches expectations
    expect(result).toEqual({
     "realEstates": mockRealEstates.map((RealEstate) => new RealEstateViewModel(RealEstate)),
    });
    expect(service.findAllByTaxSubmissionId).toHaveBeenCalledWith(taxSubmissionId); // Ensure the service method is called correctly
  });

  it('should handle an empty result gracefully', async () => {
    // Mock data
    const taxSubmissionId = 54321;

    // Mock the service to return null
    jest.spyOn(service, 'findAllByTaxSubmissionId').mockResolvedValue(null);

    // Call the controller method
    const result = await controller.getByTaxSubmissionId(taxSubmissionId);

    // Assert the empty mapping
    expect(result).toEqual( { realEstates: []}); // Should return an empty array
    expect(service.findAllByTaxSubmissionId).toHaveBeenCalledWith(taxSubmissionId);
  });
})
