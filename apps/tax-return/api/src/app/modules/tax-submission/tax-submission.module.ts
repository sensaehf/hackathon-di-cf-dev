import { Module } from '@nestjs/common'
import { TaxSubmissionResolver } from './tax-submission.resolver'

@Module({
  providers: [TaxSubmissionResolver],
})
export class TaxSubmissionModule {}
