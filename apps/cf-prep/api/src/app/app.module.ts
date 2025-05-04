import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { ConcentModule } from './modules/consent/consent.module'

import { SequelizeConfigService } from './sequelizeConfig.service'

@Module({
  imports: [
    // AuthModule.register(environment.auth),
    // AuditModule.forRoot(environment.audit),
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    ConcentModule,
  ],
})
export class AppModule {}
