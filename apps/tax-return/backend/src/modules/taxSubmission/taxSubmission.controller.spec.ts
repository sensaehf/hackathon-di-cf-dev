import { Test, TestingModule } from '@nestjs/testing';
import { TaxSubmissionController } from './taxSubmission.controller';
import { TaxSubmissionService } from './taxSubmission.service';
import { TaxSubmissionViewModel } from './dto/taxSubmissionViewModel.dto';
import { TaxSubmission } from './taxSubmission.model';

describe('TaxSubmissionController', () => {
  let controller: TaxSubmissionController;
  let service: TaxSubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxSubmissionController],
      providers: [
        {
          provide: TaxSubmissionService,
          useValue: {
            findByPersonId: jest.fn(), // Mock the TaxSubmissionService method
          },
        },
      ],
    }).compile();

    controller = module.get<TaxSubmissionController>(TaxSubmissionController);
    service = module.get<TaxSubmissionService>(TaxSubmissionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return submissions mapped to view models', async () => {
    // Mock data
    const personId = 12345;
    const mockTaxSubmissions: TaxSubmission[] = [
      {
        id: 1,
        personId: 12345,
        taxYear: 2021,
      } as TaxSubmission,
      {
        id: 2,
        personId: 12345,
        taxYear: 2022,
      } as TaxSubmission,
    ];

    // Mock the service behavior
    jest.spyOn(service, 'findByPersonId').mockResolvedValue(mockTaxSubmissions);

    // Call the controller method
    const result = await controller.getById(personId);

    // Assert that the result matches expectations
    expect(result).toEqual({
     "submissions": mockTaxSubmissions.map((submission) => new TaxSubmissionViewModel(submission)),
    });
    expect(service.findByPersonId).toHaveBeenCalledWith(personId); // Ensure the service method is called correctly
  });

  it('should handle an empty result gracefully', async () => {
    // Mock data
    const personId = 54321;

    // Mock the service to return null
    jest.spyOn(service, 'findByPersonId').mockResolvedValue(null);

    // Call the controller method
    const result = await controller.getById(personId);

    // Assert the empty mapping
    expect(result).toEqual( { submissions: []}); // Should return an empty array
    expect(service.findByPersonId).toHaveBeenCalledWith(personId);
  });
});
