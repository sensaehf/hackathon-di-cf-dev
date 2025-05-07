import { Test, TestingModule } from '@nestjs/testing';
import { MortgageInterestResolver } from './mortgage-interest.resolver';
import { BackendAPI } from '../../../services/backend';
import { CreateMortgageInterestInput } from './dto/create-mortgage-interest.input';
import { validate } from 'class-validator';

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
            createMortgageInterest: jest.fn(),
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

  it('should call createMortgageInterest with correct input', async () => {
    const createInput: CreateMortgageInterestInput = {
      taxSubmissionId: 1,
      lenderName: 'Bank A',
      type: 'Home Loan',
      startDate: '2023-01-01',
      termYears: 30,
      purchaseYear: 2023,
      totalAnnualPayments: 12000,
      principalRepayment: 5000,
      interestAmount: 7000,
      outstandingBalance: 200000,
      currency: 'ISK',
    };

    const mockResponse = { id: '1', ...createInput };
    jest.spyOn(backendApi, 'createMortgageInterest').mockResolvedValue(mockResponse);

    const result = await resolver.createMortgageInterest(
      { backendApi },
      createInput,
    );

    expect(result).toEqual(mockResponse);
    expect(backendApi.createMortgageInterest).toHaveBeenCalledWith(createInput);
  });  
});