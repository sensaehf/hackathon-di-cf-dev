import { Module } from '@nestjs/common'
import { MortgageService } from './mortgage.service'
import { MortgageController } from './mortgage.controller'
import { Mortgage } from './mortgage.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [SequelizeModule.forFeature([Mortgage])],
  controllers: [MortgageController],
  providers: [MortgageService],
})
export class MortgageModule {}
