import { Module } from '@nestjs/common'

import { SalaryController } from './salary.controller'
import { SalaryService } from './salary.service'
import { Salary } from './salary.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [
    SequelizeModule.forFeature([Salary]),
  ],
  controllers: [
    SalaryController
  ],
  providers: [
    SalaryService
  ],
})
export class SalaryModule {}
