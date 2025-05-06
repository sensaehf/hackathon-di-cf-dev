import { Module } from '@nestjs/common'
import { PensionsGrantsSubsidiesResolver } from './pensions-grants-subsidies.resolver'

@Module({
  providers: [PensionsGrantsSubsidiesResolver],
})
export class PensionsGrantsSubsidiesModule {}
