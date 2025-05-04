import { Injectable } from '@nestjs/common'

@Injectable()
export class ConsentService {
  getData(): { message: string } {
    return { message: 'Hello API' }
  }
}
