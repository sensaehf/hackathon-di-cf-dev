import { Module } from '@nestjs/common'
import { OtherReliabilitiesResolver } from './other-reliabilities.resolver'

@Module({
  providers: [OtherReliabilitiesResolver],
})
export class OtherReliabilitiesModule {}
