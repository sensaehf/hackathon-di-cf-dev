import { Test, TestingModule } from '@nestjs/testing';
import { PerkController } from './perk.controller';
import { PerksService } from './perk.service';
import { PerksViewModel } from './dto/perkViewModel.dto';
import { Perk } from './perk.model';

describe('PerksController', () => {
  let controller: PerkController;
  let service: PerksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerkController],
      providers: [
        {
          provide: PerksService,
          useValue: {
            findByPersonId: jest.fn(), // Mock the PerksService method
          },
        },
      ],
    }).compile();

    controller = module.get<PerkController>(PerkController);
    service = module.get<PerksService>(PerksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return submissions mapped to view models', async () => {
    // Mock data
    const personId = 12345;
    const mockPerkss: Perk[] = [
      {
        id: 1,
      } as Perk,
      {
        id: 2,
      } as Perk,
    ];

    // Mock the service behavior
    jest.spyOn(service, 'findByPersonId').mockResolvedValue(mockPerkss);

    // Call the controller method
    const result = await controller.getById(personId);

    // Assert that the result matches expectations
    expect(result).toEqual({
     "submissions": mockPerkss.map((submission) => new PerksViewModel(submission)),
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
