import { Test, TestingModule } from '@nestjs/testing';
import { SalaryWorkPaymentsResolver } from './salary-work-payments.resolver';
import { BackendAPI } from '../../../services/backend';

describe('SalaryWorkPaymentsResolver', () => {
  let resolver: SalaryWorkPaymentsResolver;
  let backendApi: BackendAPI;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalaryWorkPaymentsResolver,
        {
          provide: BackendAPI,
          useValue: {
            getAllSalaryWorkPaymentsByTaxSubmission: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<SalaryWorkPaymentsResolver>(SalaryWorkPaymentsResolver);
    backendApi = module.get<BackendAPI>(BackendAPI);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call getAllSalaryWorkPaymentsByTaxSubmission with correct taxSubmissionId', async () => {
    const taxSubmissionId = 1;
    const mockData = [{ id: 1, taxSubmissionId }];
    jest
      .spyOn(backendApi, 'getAllSalaryWorkPaymentsByTaxSubmission')
      .mockResolvedValue(mockData);

    const result = await resolver.findAllSalaryWorkPaymentsByTaxSubmission(
      { backendApi },
      taxSubmissionId,
    );

    expect(result).toEqual(mockData);
    expect(backendApi.getAllSalaryWorkPaymentsByTaxSubmission).toHaveBeenCalledWith(
      taxSubmissionId,
    );
  });
});