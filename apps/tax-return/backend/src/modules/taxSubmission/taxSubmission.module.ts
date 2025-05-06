import { Module } from '@nestjs/common'

import { TaxSubmissionController } from './taxSubmission.controller'
import { TaxSubmissionService } from './taxSubmission.service'
import { TaxSubmission } from './taxSubmission.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [
    SequelizeModule.forFeature([TaxSubmission]),
  ],
  controllers: [
    TaxSubmissionController
  ],
  providers: [
    TaxSubmissionService
  ],
})
export class TaxSubmissionModule {}
