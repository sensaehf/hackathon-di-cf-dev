import { Test, TestingModule } from '@nestjs/testing'
import { VehicleResolver } from './vehicle.resolver'
import { BackendAPI } from '../../../services'
import { CreateVehicleInput } from './dto/create-vehicle.input'

describe('VehicleResolver', () => {
  let resolver: VehicleResolver
  let backendApi: BackendAPI

  beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      VehicleResolver,
      {
        provide: BackendAPI,
        useValue: {
          getAllVehiclesByTaxSubmission: jest.fn(),
          createVehicle: jest.fn(),
        },
      },
    ],
  }).compile();

    resolver = module.get<VehicleResolver>(VehicleResolver)
    backendApi = module.get<BackendAPI>(BackendAPI)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should call createVehicle with correct input', async () => {
    const createInput: CreateVehicleInput = {
      id: 'FMH71',
      taxSubmissionId: 1,
      purchaseYear: 2023,
      purchasePrice: 25000.0,
      currency: 'ISK',
    };
  
    const mockResponse = createInput;
    jest.spyOn(backendApi, 'createVehicle').mockResolvedValue(mockResponse);
  
    const result = await resolver.createVehicle(
      { backendApi },
      createInput,
    );
  
    expect(result).toEqual(mockResponse);
    expect(backendApi.createVehicle).toHaveBeenCalledWith(createInput);
  });

  
})
