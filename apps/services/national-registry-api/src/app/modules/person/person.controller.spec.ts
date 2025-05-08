import { Test, TestingModule } from '@nestjs/testing'
import { PersonController } from './person.controller'
import { PersonService } from './person.service'
import { BadRequestException } from '@nestjs/common'

describe('PersonController', () => {
  let controller: PersonController
  let personServiceMock: any

  beforeEach(async () => {
    personServiceMock = {
      findOne: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        {
          provide: PersonService,
          useValue: personServiceMock,
        },
      ],
    }).compile()

    controller = module.get<PersonController>(PersonController)
  })

  describe('findOne', () => {
    it('should call service and return a person when header is provided', async () => {
      const mockPerson = { id: '1234567890', name: 'Test Person' }
      personServiceMock.findOne.mockResolvedValue(mockPerson)

      const result = await controller.findOne('1234567890')

      expect(personServiceMock.findOne).toHaveBeenCalledWith('1234567890')
      expect(result).toEqual(mockPerson)
    })

    it('should throw BadRequestException when header is missing', async () => {
      try {
        await controller.findOne(undefined as any)
        fail('Expected error not thrown')
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.message).toBe('National Id is missing')
      }
    })

  })
})
