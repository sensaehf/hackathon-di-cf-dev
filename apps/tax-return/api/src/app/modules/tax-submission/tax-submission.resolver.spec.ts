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

  describe('createTaxSubmission', () => {
    it('should create a new tax submission', async () => {
      const input: CreateTaxSubmissionInput = { personId: 1, taxYear: 2025 }
      const result: TaxSubmission = {
        id: 1,
        personId: 1,
        taxYear: 2025,
        createdAt: "2025-05-06T12:58:32.731Z",
      }
      backendApi.createTaxSubmission.mockResolvedValue(result)

      expect(await resolver.createTaxSubmission({ backendApi }, input)).toEqual(result)
      expect(backendApi.createTaxSubmission).toHaveBeenCalledWith(input)
    })
  })

  describe('findAllTaxSubmissions', () => {
    it('should return all tax submissions', async () => {
      const result: TaxSubmission[] = [
        { id: 1, personId: 1, taxYear: 2025, createdAt: "2025-05-06T12:58:32.731Z" },
      ]
      backendApi.getAllTaxSubmissions.mockResolvedValue(result)

      expect(await resolver.findAllTaxSubmissionsForUser({ backendApi }, 1)).toEqual(result)
      expect(backendApi.getAllTaxSubmissions).toHaveBeenCalled()
    })
  })

  describe('findOneTaxSubmission', () => {
    it('should return a single tax submission by ID', async () => {
      const id = 1
      const result: TaxSubmission = {
        id: 1,
        personId: 1,
        taxYear: 2025,
        createdAt: "2025-05-06T12:58:32.731Z",
      }
      backendApi.getTaxSubmissionById.mockResolvedValue(result)

      expect(await resolver.findOneTaxSubmission({ backendApi }, id)).toEqual(result)
      expect(backendApi.getTaxSubmissionById).toHaveBeenCalledWith(id)
    })
  })

  describe('updateTaxSubmission', () => {
    it('should update a tax submission', async () => {
      const input: UpdateTaxSubmissionInput = { id: 1, personId: 1, taxYear: 2026 }
      const result: TaxSubmission = {
        id: 1,
        personId: 1,
        taxYear: 2026,
        createdAt: "2025-05-06T12:58:32.731Z",
      }
      backendApi.updateTaxSubmission.mockResolvedValue(result)

      expect(await resolver.updateTaxSubmission({ backendApi }, input)).toEqual(result)
      expect(backendApi.updateTaxSubmission).toHaveBeenCalledWith(input.id, input)
    })
  })

  describe('removeTaxSubmission', () => {
    it('should remove a tax submission', async () => {
      const id = 1
      backendApi.deleteTaxSubmission.mockResolvedValue(undefined)

      expect(await resolver.removeTaxSubmission({ backendApi }, id)).toEqual(true)
      expect(backendApi.deleteTaxSubmission).toHaveBeenCalledWith(id)
    })
  })
})