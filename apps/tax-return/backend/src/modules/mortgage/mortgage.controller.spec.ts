import { Test, TestingModule } from '@nestjs/testing';
import { MortgageController } from './mortgage.controller';
import { MortgageService } from './mortgage.service';
import { CreateMortgageDto } from './dto/create-mortgage.dto';
import { UpdateMortgageDto } from './dto/update-mortgage.dto';
import { Mortgage } from './mortgage.model';

describe('MortgageController', () => {
  let controller: MortgageController;
  let service: MortgageService;
  let module: TestingModule;

  beforeAll(async () => {
    const mockService = {
      create: jest.fn(),
      findAllBySubmissionId: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    module = await Test.createTestingModule({
      controllers: [MortgageController],
      providers: [
        {
          provide: MortgageService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<MortgageController>(MortgageController);
    service = module.get<MortgageService>(MortgageService);
  });

  afterAll(async () => {
    await module.close()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct parameters', async () => {
      const createDto: CreateMortgageDto = {
        id: '1',
        lenderName: 'Bank',
        type: 'Home',
        description: 'Mortgage for home',
        startDate: new Date(),
        termYears: 30,
        purchaseYear: 2025,
        totalAnnualPayments: 12000,
        principalRepayment: 10000,
        interestAmount: 2000,
        outstandingBalance: 300000,
        currency: 'USD',
      };
      const taxSubmissionId = 1;
      jest.spyOn(service, 'create').mockResolvedValue(createDto as Mortgage);

      const result = await controller.create(createDto, taxSubmissionId);

      expect(service.create).toHaveBeenCalledWith(createDto, taxSubmissionId);
      expect(result).toEqual(createDto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAllBySubmissionId with correct parameters', async () => {
      const taxSubmissionId = 1;
      const mockMortgages: Mortgage[] = [];
      jest.spyOn(service, 'findAllBySubmissionId').mockResolvedValue(mockMortgages);

      const result = await controller.findAll(taxSubmissionId);

      expect(service.findAllBySubmissionId).toHaveBeenCalledWith(taxSubmissionId);
      expect(result).toEqual({ mortgages: [] });
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with correct parameters', async () => {
      const id = '1';
      const mockMortgage: Mortgage = {
        "id": "56783900123",
        "taxSubmissionId": 1,
        "lenderName": "Íslandsbanki hf.",
        "type": "Mortgage",
        "description": "Mortgage for home",
        "startDate": new Date("2021-06-15"),
        "termYears": 30,
        "purchaseYear": 2021,
        "totalAnnualPayments": 2280000.00,
        "principalRepayment": 1360000.00,
        "interestAmount": 920000.00,
        "outstandingBalance": 28540000.00,
        "year": 2024,
        "currency": "ISK",
        "created": new Date("2021-06-15"),
        "modified": new Date("2021-06-15")
      } as Mortgage;
      jest.spyOn(service, 'findOne').mockResolvedValue(mockMortgage);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockMortgage);
    });
  });

  describe('update', () => {
    it('should call service.update with correct parameters', async () => {
      const id = '1';
      const updateDto: UpdateMortgageDto = {
        lenderName: 'Updated Bank',
      };
      const mockUpdatedMortgage: Mortgage = { id, lenderName: 'Updated Bank', type: '', description: '', startDate: new Date(), termYears: 0, purchaseYear: 0, totalAnnualPayments: 0, principalRepayment: 0, interestAmount: 0, outstandingBalance: 0, currency: '' } as Mortgage;
      jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedMortgage);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(id, updateDto);
      expect(result).toEqual(mockUpdatedMortgage);
    });
  });

  describe('remove', () => {
    it('should call service.remove with correct parameters', async () => {
      const id = '1';
      jest.spyOn(service, 'remove').mockResolvedValue(1);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(1);
    });
  });
});
