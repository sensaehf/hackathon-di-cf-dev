import { Test, TestingModule } from '@nestjs/testing';
import { MortgageInterestResolver } from './mortgage-interest.resolver';
import { BackendAPI } from '../../../services/backend';

describe('MortgageInterestResolver', () => {
  let resolver: MortgageInterestResolver;
  let backendApi: BackendAPI;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MortgageInterestResolver,
        {
          provide: BackendAPI,
          useValue: {
            getAllMortgageInterestsByTaxSubmission: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<MortgageInterestResolver>(MortgageInterestResolver);
    backendApi = module.get<BackendAPI>(BackendAPI);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call getAllMortgageInterestsByTaxSubmission with correct taxSubmissionId', async () => {
    const taxSubmissionId = 1;
    const mockData = [{ id: '1', taxSubmissionId }];
    jest
      .spyOn(backendApi, 'getAllMortgageInterestsByTaxSubmission')
      .mockResolvedValue(mockData);

    const result = await resolver.findAllMortgageInterestsByTaxSubmission(
      { backendApi },
      taxSubmissionId,
    );

    expect(result).toEqual(mockData);
    expect(backendApi.getAllMortgageInterestsByTaxSubmission).toHaveBeenCalledWith(
      taxSubmissionId,
    );
  });
});