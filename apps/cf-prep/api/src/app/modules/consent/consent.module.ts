import { Module } from '@nestjs/common'

import { ConsentController } from './consent.controller'
import { ConsentService } from './consent.service'

@Module({
  imports: [],
  controllers: [ConsentController],
  providers: [ConsentService],
})
export class ConcentModule {}
