import { bootstrap } from '@island.is/infra-nest-server'
import { AppModule } from './app/app.module'
import { openApi } from './openApi'

bootstrap({
  appModule: AppModule,  
  name: 'tax-return-backend',
  port: 3000,
  swaggerPath: 'api/swagger',
  openApi,
})