import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize'
import { PerkService } from './perk.service';
import { Perk } from './perk.model';
import { LOGGER_PROVIDER } from '@island.is/logging';

describe('PerkService', () => {
  let service: PerkService;
  let perksMock: { findAll: jest.Mock; create: jest.Mock };
  let loggerMock: { debug: jest.Mock };

  const mockSubmissions: Perk[] = [
    {
      id: 1,
      taxSubmissionId: 123,
      description: 'Yaya ya ya',
      amount: 10056,
      currency: 'ISK',
      type: 'Baffel'

    } as Perk,
    {
      id: 2,
      taxSubmissionId: 123,
      description: 'No no no',
      amount: 100,
      currency: 'EUR',
      type: 'Test of type'
    } as Perk,
  ];

  beforeEach(async () => {
    // Create mock implementations
    perksMock = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    loggerMock = {
      debug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports:[],
      providers: [
        {
                provide: getModelToken(Perk),
                useValue: perksMock
        },
        PerkService,       
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

  describe('findByTaxSubmissionId', () => {
    it('should find perks by taxSubmissionId and log debug message', async () => {
      // Mock data
      const taxSubmissionId = 12345;
     
      // Set up mocks
      (perksMock.findAll as jest.Mock).mockResolvedValue(mockSubmissions);

      // Call service method
      const result = await service.findByTaxSubmissionId(taxSubmissionId);

      // Assertions
      expect(result).toEqual(mockSubmissions);
      expect(perksMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId: taxSubmissionId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding perks for taxSubmissionId - "${taxSubmissionId}"`,
      );
    });

    it('should return null if no perks are found', async () => {
      // Mock data
      const taxSubmissionId = 11;

      // Set up mocks
      (perksMock.findAll as jest.Mock).mockResolvedValue([]);

      // Call service method
      const result = await service.findByTaxSubmissionId(taxSubmissionId);

      // Assertions
      expect(result).toEqual([]);
      expect(perksMock.findAll).toHaveBeenCalledWith({
        where: { taxSubmissionId },
      });
      expect(loggerMock.debug).toHaveBeenCalledWith(
        `Finding perks for taxSubmissionId - "${taxSubmissionId}"`,
      );
    });
  });

});
