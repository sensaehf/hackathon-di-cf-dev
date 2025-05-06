import { Test, TestingModule } from '@nestjs/testing';
import { TaxSubmissionResolver } from './tax-submission.resolver';
import { BackendAPI } from '../../../services/backend';

describe('TaxSubmissionResolver', () => {
  let resolver: TaxSubmissionResolver;
  let backendApi: BackendAPI;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxSubmissionResolver,
        {
          provide: BackendAPI,
          useValue: {
            getAllTaxSubmissionsForUser: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<TaxSubmissionResolver>(TaxSubmissionResolver);
    backendApi = module.get<BackendAPI>(BackendAPI);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call getAllTaxSubmissionsForUser with correct personId', async () => {
    const personId = 123;
    const mockData = [{ id: 1, personId }];
    jest
      .spyOn(backendApi, 'getAllTaxSubmissionsForUser')
      .mockResolvedValue(mockData);

    const result = await resolver.findAllTaxSubmissionsForUser(
      { backendApi },
      personId,
    );

    expect(result).toEqual(mockData);
    expect(backendApi.getAllTaxSubmissionsForUser).toHaveBeenCalledWith(personId);
  });
});