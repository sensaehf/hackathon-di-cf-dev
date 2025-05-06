import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OtherReliabilities } from './other-reliabilities.model';
import { OtherReliabilitiesService } from './other-reliabilities.service';
import { OtherReliabilitiesController } from './other-reliabilities.controller';

@Module({
  imports: [SequelizeModule.forFeature([OtherReliabilities])],
  controllers: [OtherReliabilitiesController],
  providers: [OtherReliabilitiesService],
})
export class OtherReliabilitiesModule {}