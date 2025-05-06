import { Module } from '@nestjs/common'
import { SalaryWorkPaymentsResolver } from './salary-work-payments.resolver'

@Module({
  providers: [SalaryWorkPaymentsResolver],
})
export class SalaryWorkPaymentsModule {}
