import { Test, TestingModule } from '@nestjs/testing'

import { ConsentController } from './consent.controller'
import { ConsentService } from './consent.service'
import { Consent } from './consent.model'

describe('AppController', () => {
  let app: TestingModule

  interface Then {
    result: Consent | null
    error: Error
  }

  type GivenWhenThen = () => Promise<Then>
  let then : Then
  let givenWhenThen: GivenWhenThen

  beforeAll(async () => {

    const repositoryMock = {  
      findByNationalId: jest.fn().mockResolvedValue({ nationalId: "1", consented: true }),      
    };  
        
    givenWhenThen = async () => {      

      const then = {} as Then
      await app.get<ConsentController>(ConsentController).getData()
        .then((result) => (then.result = result))
        .catch((error) => (then.error = error))
      
      return then
    }

    app = await Test.createTestingModule({
      controllers: [ConsentController],
      providers: [{
        provide: ConsentService,  
        useValue: repositoryMock
      }],
    }).compile()

   
    
       
       
  })

  describe('getData', () => {
    it('should return "Hello API"', async () => {
      
      const then = await givenWhenThen()
      
      expect(then.result).toEqual({ nationalId: "1", consented: true })
    })
  })
})
