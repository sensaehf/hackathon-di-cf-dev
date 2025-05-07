import { Test, TestingModule } from '@nestjs/testing';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';
import { SalaryViewModel } from './dto/salaryViewModel.dto';
import { Salary } from './salary.model';

describe('SalaryController', () => {
  let controller: SalaryController;
  let service: SalaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryController],
      providers: [
        {
          provide: SalaryService,
          useValue: {
            findByTaxSubmissionId: jest.fn(), // Mock the SalaryService method
          },
        },
      ],
    }).compile();

    controller = module.get<SalaryController>(SalaryController);
    service = module.get<SalaryService>(SalaryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return salaries mapped to view models', async () => {
    // Mock data
    const taxSubmissionId = 12345;
    const mockSalarys: Salary[] = [
      {
        id: 1,
        taxSubmissionId: 123456,
        year: 2024,
        employerName: 'Nordvega'
      } as Salary,
      {
        id: 2,
        taxSubmissionId: 123456,
        year: 2024,
        employerName: 'Hau'
      } as Salary,
    ];

    // Mock the service behavior
    jest.spyOn(service, 'findByTaxSubmissionId').mockResolvedValue(mockSalarys);

    // Call the controller method
    const result = await controller.getByTaxSubmissionId(taxSubmissionId);

    // Assert that the result matches expectations
    expect(result).toEqual({
     "salaries": mockSalarys.map((salary) => new SalaryViewModel(salary)),
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
    expect(result).toEqual( { salaries: []}); // Should return an empty array
    expect(service.findByTaxSubmissionId).toHaveBeenCalledWith(taxSubmissionId);
  });

  
});
