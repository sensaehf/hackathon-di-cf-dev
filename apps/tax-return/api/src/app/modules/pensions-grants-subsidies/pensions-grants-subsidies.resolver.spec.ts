import { Test, TestingModule } from '@nestjs/testing';
import { PensionsGrantsSubsidiesResolver } from './pensions-grants-subsidies.resolver';
import { BackendAPI } from '../../../services/backend';

describe('PensionsGrantsSubsidiesResolver', () => {
  let resolver: PensionsGrantsSubsidiesResolver;
  let backendApi: BackendAPI;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PensionsGrantsSubsidiesResolver,
        {
          provide: BackendAPI,
          useValue: {
            getAllPensionsGrantsSubsidiesByTaxSubmission: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<PensionsGrantsSubsidiesResolver>(
      PensionsGrantsSubsidiesResolver,
    );
    backendApi = module.get<BackendAPI>(BackendAPI);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call getAllPensionsGrantsSubsidiesByTaxSubmission with correct taxSubmissionId', async () => {
    const taxSubmissionId = 1;
    const mockData = [{ id: 1, taxSubmissionId }];
    jest
      .spyOn(backendApi, 'getAllPensionsGrantsSubsidiesByTaxSubmission')
      .mockResolvedValue(mockData);

    const result = await resolver.findAllPensionsGrantsSubsidiesByTaxSubmission(
      { backendApi },
      taxSubmissionId,
    );

    expect(result).toEqual(mockData);
    expect(backendApi.getAllPensionsGrantsSubsidiesByTaxSubmission).toHaveBeenCalledWith(
      taxSubmissionId,
    );
  });
});