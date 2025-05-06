import { Test, TestingModule } from '@nestjs/testing'
import { TaxSubmissionResolver } from './tax-submission.resolver'
import { TaxSubmission } from './entities/tax-submission.entity'
import { CreateTaxSubmissionInput } from './dto/create-tax-submission.input'
import { UpdateTaxSubmissionInput } from './dto/update-tax-submission.input'

describe('TaxSubmissionResolver', () => {
  let resolver: TaxSubmissionResolver
  let backendApi: any

  beforeEach(async () => {
    backendApi = {
      createTaxSubmission: jest.fn(),
      getAllTaxSubmissions: jest.fn(),
      getTaxSubmissionById: jest.fn(),
      updateTaxSubmission: jest.fn(),
      deleteTaxSubmission: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxSubmissionResolver,
        {
          provide: 'dataSources',
          useValue: { backendApi },
        },
      ],
    }).compile()

    resolver = module.get<TaxSubmissionResolver>(TaxSubmissionResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createTaxSubmissionNew', () => {
    it('should create a new tax submission', async () => {
      const input: CreateTaxSubmissionInput = { id: 1, personId: 1, taxYear: 2025 }
      const result: TaxSubmission = {
        id: 1,
        personId: 1,
        taxYear: 2025,
        createdAt: new Date(),
      }
      backendApi.createTaxSubmission.mockResolvedValue(result)

      expect(await resolver.createTaxSubmissionNew({ backendApi }, input)).toEqual(result)
      expect(backendApi.createTaxSubmission).toHaveBeenCalledWith(input)
    })
  })

  describe('findAllTaxSubmissionsNew', () => {
    it('should return all tax submissions', async () => {
      const result: TaxSubmission[] = [
        { id: 1, personId: 1, taxYear: 2025, createdAt: new Date() },
      ]
      backendApi.getAllTaxSubmissions.mockResolvedValue(result)

      expect(await resolver.findAllTaxSubmissionsNew({ backendApi })).toEqual(result)
      expect(backendApi.getAllTaxSubmissions).toHaveBeenCalled()
    })
  })

  describe('findOneTaxSubmissionNew', () => {
    it('should return a single tax submission by ID', async () => {
      const id = 1
      const result: TaxSubmission = {
        id: 1,
        personId: 1,
        taxYear: 2025,
        createdAt: new Date(),
      }
      backendApi.getTaxSubmissionById.mockResolvedValue(result)

      expect(await resolver.findOneTaxSubmissionNew({ backendApi }, id)).toEqual(result)
      expect(backendApi.getTaxSubmissionById).toHaveBeenCalledWith(id)
    })
  })

  describe('updateTaxSubmissionNew', () => {
    it('should update a tax submission', async () => {
      const input: UpdateTaxSubmissionInput = { id: 1, personId: 1, taxYear: 2026 }
      const result: TaxSubmission = {
        id: 1,
        personId: 1,
        taxYear: 2026,
        createdAt: new Date(),
      }
      backendApi.updateTaxSubmission.mockResolvedValue(result)

      expect(await resolver.updateTaxSubmissionNew({ backendApi }, input)).toEqual(result)
      expect(backendApi.updateTaxSubmission).toHaveBeenCalledWith(input.id, input)
    })
  })

  describe('removeTaxSubmissionNew', () => {
    it('should remove a tax submission', async () => {
      const id = 1
      backendApi.deleteTaxSubmission.mockResolvedValue(undefined)

      expect(await resolver.removeTaxSubmissionNew({ backendApi }, id)).toEqual(true)
      expect(backendApi.deleteTaxSubmission).toHaveBeenCalledWith(id)
    })
  })
})