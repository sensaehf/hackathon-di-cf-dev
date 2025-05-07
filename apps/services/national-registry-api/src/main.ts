import { bootstrap } from '@island.is/infra-nest-server'
import { AppModule } from './app/app.module'
import { openApi } from './openApi'

bootstrap({
  appModule: AppModule,  
  name: 'national-registry-api',
  port: 3210,
  swaggerPath: 'api/swagger',
  openApi,
})