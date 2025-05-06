import { Module } from '@nestjs/common'
import { RealEstateResolver } from './real-estate.resolver'

@Module({
  providers: [RealEstateResolver],
})
export class RealEstateModule {}
