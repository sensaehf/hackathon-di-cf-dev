import { Module } from '@nestjs/common'

import { SequelizeModule } from '@nestjs/sequelize'
import { PersonModule } from './modules/person/person.module'
import { SequelizeConfigService } from './sequelizeConfig.service'

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    PersonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
