import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize'
import { PerkService } from './perk.service';
import { Perk } from './perk.model';
import { LOGGER_PROVIDER } from '@island.is/logging';

describe('PerkService', () => {
  let service: PerkService;
  let perksMock: typeof Perk;
  let loggerMock: { debug: jest.Mock };

  const mockSubmissions: Perk[] = [
    {
      id: 1,
    } as Perk,
    {
      id: 2,
    } as Perk,
  ];

  beforeEach(async () => {
    // Create mock implementations
    perksMock = {
      findAll: jest.fn(),
      create: jest.fn(),
    } as any;

    loggerMock = {
      debug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports:[],
      providers: [
        {
                provide: getModelToken(Perk),
                useValue: {
                  create: jest.fn(),
                  findOne: jest.fn(),
                  findAll: jest.fn(),
                  update: jest.fn(),
                  count: jest.fn(),
                },
        },
        PerkService,
        {
          provide: Perk,
          useValue: perksMock, // Mock Sequelize model
        },
        {
          provide: LOGGER_PROVIDER,
          useValue: loggerMock, // Mock Logger
        },
      ],
    }).compile();

    service = module.get<PerkService>(PerkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByPersonId', () => {
    it('should find submissions by personId and log debug message', async () => {
      // Mock data
      const personId = 12345;
     

      // Set up mocks
      (perksMock.findAll as jest.Mock).mockResolvedValue(mockSubmissions);

      // Call service method
      const result = await service.findByPersonId(personId);

      // Assertions
      expect(result).toEqual(mockSubmissions);
      expect(perksMock.findAll).toHaveBeenCalledWith({
        where: { person_id: personId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding tax submissions for nationalId - "${personId}"`,
      );
    });

    it('should return null if no submissions are found', async () => {
      // Mock data
      const personId = 11;

      // Set up mocks
      (perksMock.findAll as jest.Mock).mockResolvedValue([]);

      // Call service method
      const result = await service.findByPersonId(personId);

      // Assertions
      expect(result).toEqual([]);
      expect(perksMock.findAll).toHaveBeenCalledWith({
        where: { person_id: personId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding tax submissions for nationalId - "${personId}"`,
      );
    });
  });

  // describe('create', () => {
  //   it('should create a new tax submission and log debug message', async () => {
  //     // Mock data
  //     const mockPerksViewModel: PerksViewModel = {
  //       personId: 12345,
  //       taxYear: 2022,
  //     };

  //     const mockCreatedSubmission: Perks = new Perks({
  //       person_id: mockPerksViewModel.personId,
  //       tax_year: mockPerksViewModel.taxYear,
  //     });

  //     // Set up mocks
  //     (perksMock.create as jest.Mock).mockResolvedValue(mockCreatedSubmission);

  //     // Call service method
  //     const result = await service.create(mockPerksViewModel);

  //     // Assertions
  //     expect(result).toEqual(mockCreatedSubmission);
  //     expect(perksMock.create).toHaveBeenCalledWith({
  //       person_id: mockPerksViewModel.personId,
  //       tax_year: mockPerksViewModel.taxYear,
  //     });
  //     expect(loggerMock.debug).toHaveBeenCalledWith(
  //       `Creating tax submission with person id - ${mockPerksViewModel.personId} and tax year ${mockPerksViewModel.taxYear}`,
  //     );
  //   });
  // });
});
