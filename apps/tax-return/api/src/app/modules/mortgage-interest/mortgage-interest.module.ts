import { Module } from '@nestjs/common';
import { MortgageInterestResolver } from './mortgage-interest.resolver';

@Module({
  providers: [MortgageInterestResolver],
})
export class MortgageInterestModule {}