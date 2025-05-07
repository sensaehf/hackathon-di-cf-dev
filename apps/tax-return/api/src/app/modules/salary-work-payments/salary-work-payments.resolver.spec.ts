import { Test, TestingModule } from '@nestjs/testing';
import { SalaryWorkPaymentsResolver } from './salary-work-payments.resolver';
import { BackendAPI } from '../../../services/backend';
import { CreateSalaryWorkPaymentInput } from './dto/create-salary-work-payment.input';

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
            createSalaryWorkPayment: jest.fn(),
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

  it('should call createSalaryWorkPayment with correct input', async () => {
    const createInput: CreateSalaryWorkPaymentInput = {
      taxSubmissionId: 1,
      employerName: 'Company A',
      amount: 5000.0,
      currency: 'ISK',
      description: 'Monthly salary',
      year: 2023,
    };
  
    const mockResponse = { id: 1, ...createInput };
    jest.spyOn(backendApi, 'createSalaryWorkPayment').mockResolvedValue(mockResponse);
  
    const result = await resolver.createSalaryWorkPayment(
      { backendApi },
      createInput,
    );
  
    expect(result).toEqual(mockResponse);
    expect(backendApi.createSalaryWorkPayment).toHaveBeenCalledWith(createInput);
  });
});