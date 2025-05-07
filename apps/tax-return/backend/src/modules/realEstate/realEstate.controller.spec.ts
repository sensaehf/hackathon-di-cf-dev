import { Test, TestingModule } from '@nestjs/testing'
import { RealEstateController } from './realEstate.controller'
import { RealEstateService } from './realEstate.service'
import { RealEstateViewModel } from './dto/realEstate.dto';
import { RealEstate } from './realEstate.model';
import { CreateRealEstateDto } from './dto/create-realEstate.dto';
import { UpdateRealEstateDto } from './dto/update-realEstate.dto';

describe('RealEstateController', () => {
  let controller: RealEstateController;
  let service: RealEstateService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [RealEstateController],
      providers: [
        {
          provide: RealEstateService,
          useValue: {
            findAllByTaxSubmissionId: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<RealEstateController>(RealEstateController);
    service = moduleRef.get<RealEstateService>(RealEstateService);
  });

  afterAll(async () => {
    await moduleRef.close();
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

  describe('findOne', () => {
    it('should return a real estate by ID', async () => {
      const id = '1';
      const mockRealEstate: RealEstate = {
        id: '1',
        taxSubmissionId: 12345,
        address: 'Gámagata 42',
        assessedValue: 10,
        currency: 'ISK',
      } as RealEstate;

      jest.spyOn(service, 'findOne').mockResolvedValue(mockRealEstate);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockRealEstate);
    });

    it('should handle errors from service.findOne', async () => {
      const id = '2';
      const error = new Error('Not found');

      jest.spyOn(service, 'findOne').mockRejectedValue(error);

      await expect(controller.findOne(id)).rejects.toThrow('Not found');
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a real estate and return a success message', async () => {
      const id = '1';
      const updateDto = { address: 'Updated Address' } as UpdateRealEstateDto;
      const mockUpdatedRealEstate = { id, ...updateDto } as RealEstate;

      jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedRealEstate);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(id, updateDto);
      expect(result).toEqual(mockUpdatedRealEstate);
    });

    it('should handle errors from service.update', async () => {
      const id = '2';
      const updateDto = { address: 'Updated Address' } as UpdateRealEstateDto;
      const error = new Error('Update failed');

      jest.spyOn(service, 'update').mockRejectedValue(error);

      await expect(controller.update(id, updateDto)).rejects.toThrow('Update failed');
      expect(service.update).toHaveBeenCalledWith(id, updateDto);
    });
  });

  describe('remove', () => {
    it('should delete a real estate by ID', async () => {
      const id = '1';

      jest.spyOn(service, 'remove').mockResolvedValue(1);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(1);
    });

    it('should handle errors from service.remove', async () => {
      const id = '2';
      const error = new Error('Delete failed');

      jest.spyOn(service, 'remove').mockRejectedValue(error);

      await expect(controller.remove(id)).rejects.toThrow('Delete failed');
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
