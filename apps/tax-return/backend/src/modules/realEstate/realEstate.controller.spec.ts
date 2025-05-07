import { Test, TestingModule } from '@nestjs/testing'
import { RealEstateController } from './realEstate.controller'
import { RealEstateService } from './realEstate.service'
import { RealEstateViewModel } from './dto/realEstate.dto';
import { RealEstate } from './realEstate.model';
import { CreateRealEstateDto } from './dto/create-realEstate.dto';

describe('RealEstateController', () => {
  let controller: RealEstateController;
  let service: RealEstateService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RealEstateController],
      providers: [
        {
          provide: RealEstateService,
          useValue: {
            findAllByTaxSubmissionId: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RealEstateController>(RealEstateController);
    service = module.get<RealEstateService>(RealEstateService);
  });

  afterAll(async () => {
    await module.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return real estates mapped to view models', async () => {
    const taxSubmissionId = 12345;
    const mockRealEstates: RealEstate[] = [
      { id: '1', taxSubmissionId, address: 'Gámagata 42', assessedValue: 10, currency: 'ISK' } as RealEstate,
      { id: '2', taxSubmissionId, address: 'Gámagata 42', assessedValue: 10, currency: 'ISK' } as RealEstate,
    ];

    jest.spyOn(service, 'findAllByTaxSubmissionId').mockResolvedValue(mockRealEstates);

    const result = await controller.getByTaxSubmissionId(taxSubmissionId);

    expect(result).toEqual({
      realEstates: mockRealEstates.map((re) => new RealEstateViewModel(re)),
    });
    expect(service.findAllByTaxSubmissionId).toHaveBeenCalledWith(taxSubmissionId);
  });

  it('should handle an empty result gracefully', async () => {
    const taxSubmissionId = 54321;
    jest.spyOn(service, 'findAllByTaxSubmissionId').mockResolvedValue(null);

    const result = await controller.getByTaxSubmissionId(taxSubmissionId);

    expect(result).toEqual({ realEstates: [] });
    expect(service.findAllByTaxSubmissionId).toHaveBeenCalledWith(taxSubmissionId);
  });

  it('should create a new real estate', async () => {
    const taxSubmissionId = 999;
    const createDto: CreateRealEstateDto = {
      id: '3',
      address: 'Laugavegur 50',
      assessedValue: 250,
      currency: 'ISK',
    };
    const mockCreated: RealEstate = {
      id: '3',
      taxSubmissionId,
      address: 'Laugavegur 50',
      assessedValue: 250,
      currency: 'ISK',
    } as RealEstate;

    jest.spyOn(service, 'create').mockResolvedValue(mockCreated);

    const result = await controller.create(createDto, taxSubmissionId);

    expect(result).toBe(mockCreated);
    expect(service.create).toHaveBeenCalledWith(createDto, taxSubmissionId);
  });

  it('should propagate errors from service.create', async () => {
    const taxSubmissionId = 888;
    const createDto: CreateRealEstateDto = {
      id: '4',
      address: 'Skólavörðustígur 20',
      assessedValue: 500,
      currency: 'ISK',
    };
    const error = new Error('Creation failed');

    jest.spyOn(service, 'create').mockRejectedValue(error);

    await expect(controller.create(createDto, taxSubmissionId)).rejects.toThrow('Creation failed');
    expect(service.create).toHaveBeenCalledWith(createDto, taxSubmissionId);
  });
});
