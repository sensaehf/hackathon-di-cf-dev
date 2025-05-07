import { Test, TestingModule } from '@nestjs/testing'
import { PerDiemAndPerksResolver } from './per-diem-and-perks.resolver'
import { BackendAPI } from '../../../services'
import { CreatePerDiemAndPerkInput } from './dto/create-per-diem-and-perk.input'

describe('PerDiemAndPerksResolver', () => {
  let resolver: PerDiemAndPerksResolver
  let backendApi: BackendAPI;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerDiemAndPerksResolver,
        {
          provide: BackendAPI,
          useValue: {
            getAllPerDiemAndPerksByTaxSubmission: jest.fn(),
            createPerDiemAndPerk: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<PerDiemAndPerksResolver>(PerDiemAndPerksResolver)
    backendApi = module.get<BackendAPI>(BackendAPI);
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should call createPerDiemAndPerk with correct input', async () => {
    const createInput: CreatePerDiemAndPerkInput = {
      taxSubmissionId: 1,
      type: 'Travel',
      amount: 1000.0,
      currency: 'ISK',
      description: 'Travel allowance',
    };
  
    const mockResponse = { id: 1, ...createInput };
    jest.spyOn(backendApi, 'createPerDiemAndPerk').mockResolvedValue(mockResponse);
  
    const result = await resolver.createPerDiemAndPerk(
      { backendApi },
      createInput,
    );
  
    expect(result).toEqual(mockResponse);
    expect(backendApi.createPerDiemAndPerk).toHaveBeenCalledWith(createInput);
  });
})
