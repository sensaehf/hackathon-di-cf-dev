import { Test, TestingModule } from '@nestjs/testing';
import { RealEstateResolver } from './real-estate.resolver';
import { BackendAPI } from '../../../services/backend';
import { CreateRealEstateInput } from './dto/create-real-estate.input';

describe('RealEstateResolver', () => {
  let resolver: RealEstateResolver;
  let backendApi: BackendAPI;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RealEstateResolver,
        {
          provide: BackendAPI,
          useValue: {
            getAllRealEstatesByTaxSubmission: jest.fn(),
            createRealEstate: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<RealEstateResolver>(RealEstateResolver);
    backendApi = module.get<BackendAPI>(BackendAPI);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call getAllRealEstatesByTaxSubmission with correct taxSubmissionId', async () => {
    const taxSubmissionId = 1;
    const mockData = [{ id: '1', taxSubmissionId }];
    jest
      .spyOn(backendApi, 'getAllRealEstatesByTaxSubmission')
      .mockResolvedValue(mockData);

    const result = await resolver.findAllRealEstatesByTaxSubmission(
      { backendApi },
      taxSubmissionId,
    );

    expect(result).toEqual(mockData);
    expect(backendApi.getAllRealEstatesByTaxSubmission).toHaveBeenCalledWith(
      taxSubmissionId,
    );
  });

  it('should call createRealEstate with correct input', async () => {
    const createInput: CreateRealEstateInput = {
      taxSubmissionId: 1,
      address: '123 Main St',
      assessedValue: 500000,
      currency: 'ISK',
      id: '1'
    };
  
    const mockResponse = { ...createInput };
    jest.spyOn(backendApi, 'createRealEstate').mockResolvedValue(mockResponse);
  
    const result = await resolver.createRealEstate(
      { backendApi },
      createInput,
    );
  
    expect(result).toEqual(mockResponse);
    expect(backendApi.createRealEstate).toHaveBeenCalledWith(createInput);
  });
  
});