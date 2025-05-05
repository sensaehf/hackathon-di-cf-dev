import { buildOpenApi } from '@island.is/infra-nest-server'

import { AppModule } from './app/app.module'
import { openApi } from './openApi'

const outputFile = process.env.ADS_PRIVATE_CLIENT
  ? 'private-openapi'
  : 'openapi'

buildOpenApi({
  path: `apps/cf-prep/api/src/${outputFile}.yaml`,
  appModule: AppModule,
  openApi,
})
