import { Test, TestingModule } from '@nestjs/testing'
import { PersonService } from './person.service'
import { getModelToken } from '@nestjs/sequelize'
import { Person } from './entities/person.entity'
import { LOGGER_PROVIDER } from '@island.is/logging'

describe('PersonService', () => {
  let service: PersonService
  let personModelMock: any
  let loggerMock: any

  beforeEach(async () => {
    personModelMock = {
      findByPk: jest.fn(),
    }

    loggerMock = {
      debug: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: getModelToken(Person),
          useValue: personModelMock,
        },
        {
          provide: LOGGER_PROVIDER,
          useValue: loggerMock,
        },
      ],
    }).compile()

    service = module.get<PersonService>(PersonService)
  })

  describe('findOne', () => {
    it('should call logger and return a person if found', async () => {
      const mockPerson = { id: '1234567890', name: 'Test User' }
      personModelMock.findByPk.mockResolvedValue(mockPerson)

      const result = await service.findOne('1234567890')

      expect(loggerMock.debug).toHaveBeenCalledWith(
        'Getting person with national id 1234567890',
      )
      expect(personModelMock.findByPk).toHaveBeenCalledWith('1234567890')
      expect(result).toEqual(mockPerson)
    })

    it('should return null if person is not found', async () => {
      personModelMock.findByPk.mockResolvedValue(null)

      const result = await service.findOne('0000000000')

      expect(loggerMock.debug).toHaveBeenCalledWith(
        'Getting person with national id 0000000000',
      )
      expect(personModelMock.findByPk).toHaveBeenCalledWith('0000000000')
      expect(result).toBeNull()
    })
  })
})
