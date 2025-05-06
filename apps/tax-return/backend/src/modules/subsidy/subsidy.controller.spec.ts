import { Test, TestingModule } from '@nestjs/testing';
import { SubsidyController } from './subsidy.controller';
import { SubsidyService } from './subsidy.service';
import { SubsidyViewModel } from './dto/subsidyViewModel.dto';
import { Subsidy } from './subsidy.model';

describe('SubsidyController', () => {
  let controller: SubsidyController;
  let service: SubsidyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubsidyController],
      providers: [
        {
          provide: SubsidyService,
          useValue: {
            findByTaxSubmissionId: jest.fn(), // Mock the SubsidyService method
          },
        },
      ],
    }).compile();

    controller = module.get<SubsidyController>(SubsidyController);
    service = module.get<SubsidyService>(SubsidyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return subsidies mapped to view models', async () => {
    // Mock data
    const taxSubmissionId = 12345;
    const mockSubsidys: Subsidy[] = [
      {
        id: 1,
        taxSubmissionId: 123456,
        amount: 10001,
        currency: 'ISK',
        description: 'Its description',
        grantType: 'Sport Grant',
        sourceName: 'Viking IL'      
      } as Subsidy,
      {
        id: 2,
        taxSubmissionId: 123456,
        amount: 10,
        currency: 'EUR',
        description: 'Pension',
        grantType: 'Pension',
        sourceName: 'Pension fund'        
      } as Subsidy,
    ];

    // Mock the service behavior
    jest.spyOn(service, 'findByTaxSubmissionId').mockResolvedValue(mockSubsidys);

    // Call the controller method
    const result = await controller.getByTaxSubmissionId(taxSubmissionId);

    // Assert that the result matches expectations
    expect(result).toEqual({
     "subsidies": mockSubsidys.map((subsidy) => new SubsidyViewModel(subsidy)),
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
    expect(result).toEqual( { subsidies: []}); // Should return an empty array
    expect(service.findByTaxSubmissionId).toHaveBeenCalledWith(taxSubmissionId);
  });
});
