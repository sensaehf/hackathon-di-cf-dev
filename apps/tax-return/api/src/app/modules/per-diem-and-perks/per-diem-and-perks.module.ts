import { Module } from '@nestjs/common'
import { PerDiemAndPerksResolver } from './per-diem-and-perks.resolver'

@Module({
  providers: [PerDiemAndPerksResolver],
})
export class PerDiemAndPerksModule {}
