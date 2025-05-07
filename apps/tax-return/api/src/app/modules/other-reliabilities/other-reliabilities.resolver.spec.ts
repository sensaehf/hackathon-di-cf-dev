import { Test, TestingModule } from '@nestjs/testing';
import { OtherReliabilitiesResolver } from './other-reliabilities.resolver';
import { BackendAPI } from '../../../services/backend';
import { CreateOtherReliabilityInput } from './dto/create-other-reliability.input';

describe('OtherReliabilitiesResolver', () => {
  let resolver: OtherReliabilitiesResolver;
  let backendApi: BackendAPI;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtherReliabilitiesResolver,
        {
          provide: BackendAPI,
          useValue: {
            getAllOtherReliabilitiesByTaxSubmission: jest.fn(),
            createOtherReliability: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<OtherReliabilitiesResolver>(OtherReliabilitiesResolver);
    backendApi = module.get<BackendAPI>(BackendAPI);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call getAllOtherReliabilitiesByTaxSubmission with correct taxSubmissionId', async () => {
    const taxSubmissionId = 1;
    const mockData = [{ id: 1, taxSubmissionId }];
    jest
      .spyOn(backendApi, 'getAllOtherReliabilitiesByTaxSubmission')
      .mockResolvedValue(mockData);

    const result = await resolver.findAllOtherReliabilitiesByTaxSubmission(
      { backendApi },
      taxSubmissionId,
    );

    expect(result).toEqual(mockData);
    expect(backendApi.getAllOtherReliabilitiesByTaxSubmission).toHaveBeenCalledWith(
      taxSubmissionId,
    );
  });

  it('should call createOtherReliability with correct input', async () => {
    const createInput: CreateOtherReliabilityInput = {
      taxSubmissionId: 1,
      description: 'Test reliability',
      interestAmount: 100.0,
      balance: 500.0,
      year: 2023,
      currency: 'ISK',
    };

    const mockResponse = { id: 1, ...createInput };
    jest.spyOn(backendApi, 'createOtherReliability').mockResolvedValue(mockResponse);

    const result = await resolver.createOtherReliability(
      { backendApi },
      createInput,
    );

    expect(result).toEqual(mockResponse);
    expect(backendApi.createOtherReliability).toHaveBeenCalledWith(createInput);
  });
});