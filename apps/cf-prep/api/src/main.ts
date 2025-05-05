import { bootstrap } from '@island.is/infra-nest-server'

import { AppModule } from './app/app.module'
import { openApi } from './openApi'

bootstrap({
  appModule: AppModule,
  name: 'cf-prep-api',
  swaggerPath: 'api/swagger',
  openApi,
})

