import { Test, TestingModule } from '@nestjs/testing';
import { PerkController } from './perk.controller';
import { PerkService } from './perk.service';
import { PerkViewModel } from './dto/perkViewModel.dto';
import { Perk } from './perk.model';

describe('PerksController', () => {
  let controller: PerkController;
  let service: PerkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerkController],
      providers: [
        {
          provide: PerkService,
          useValue: {
            findByTaxSubmissionId: jest.fn(), // Mock the PerksService method
          },
        },
      ],
    }).compile();

    controller = module.get<PerkController>(PerkController);
    service = module.get<PerkService>(PerkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return perks mapped to view models', async () => {
    // Mock data
    const personId = 12345;
    const mockPerks: Perk[] = [
      {
        id: 1,
      } as Perk,
      {
        id: 2,
      } as Perk,
    ];

    // Mock the service behavior
    jest.spyOn(service, 'findByTaxSubmissionId').mockResolvedValue(mockPerks);

    // Call the controller method
    const result = await controller.getById(personId);

    // Assert that the result matches expectations
    expect(result).toEqual({
     "perks": mockPerks.map((perk) => new PerkViewModel(perk)),
    });
    expect(service.findByTaxSubmissionId).toHaveBeenCalledWith(personId); // Ensure the service method is called correctly
  });

  it('should handle an empty result gracefully', async () => {
    // Mock data
    const personId = 54321;

    // Mock the service to return null
    jest.spyOn(service, 'findByTaxSubmissionId').mockResolvedValue(null);

    // Call the controller method
    const result = await controller.getById(personId);

    // Assert the empty mapping
    expect(result).toEqual( { perks: []}); // Should return an empty array
    expect(service.findByTaxSubmissionId).toHaveBeenCalledWith(personId);
  });
});
