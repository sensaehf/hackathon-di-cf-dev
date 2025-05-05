import { mock } from 'jest-mock-extended'
import { Test } from '@nestjs/testing'

import { ConsentService } from './consent.service'
import { LOGGER_PROVIDER } from '@island.is/logging'
import { Consent } from './consent.model'
import { getModelToken } from '@nestjs/sequelize'

describe('AppService', () => {
  let service: ConsentService

  interface Then {
    result: Consent | null
    error: Error
  }

  type GivenWhenThen = () => Promise<Then>
  let givenWhenThen: GivenWhenThen

  beforeAll(async () => {

    const repositoryMock = {  
      findOne: jest.fn().mockResolvedValue({ nationalId: "1", consented: true }),  
      findAll: jest.fn().mockResolvedValue([{ nationalId: "1", consented: true }]),  
      create: jest.fn().mockResolvedValue({ nationalId: "1", consented: true }),  
      update: jest.fn(),  
      destroy: jest.fn().mockResolvedValue(1),  
    };  

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Consent),  
          useValue: repositoryMock
        },
        {  
          provide: LOGGER_PROVIDER,  
          useValue: {  
            info: jest.fn(),  
            error: jest.fn(),
            debug: jest.fn()
          },  
        },        
        ConsentService,
      ],
    })
    .useMocker((token) => {
      if (typeof token === 'function') {
        return mock()
      }
    })
    .compile()

    service = moduleRef.get<ConsentService>(ConsentService)

    
    givenWhenThen = async () => {
      const then = {} as Then

      await 
        service.findByNationalId('1')
        .then((result) => (then.result = result))
        .catch((error) => (then.error = error))

      return then
    }
    

  })

  describe('getData', () => {
    it('should return "Hello API"', async () => {
      const then = await givenWhenThen()

      expect(then.result).toEqual({ nationalId: "1", consented: true })
    })
  })
})
