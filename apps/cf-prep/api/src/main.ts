// /**
//  * This is not a production server yet!
//  * This is only a minimal backend to get started.
//  */

// import { Logger } from '@nestjs/common'
// import { NestFactory } from '@nestjs/core'

// import { ConcentModule } from './app/modules/consent/consent.module'

// async function bootstrap() {
//   const app = await NestFactory.create(ConcentModule)
//   const globalPrefix = 'api'
//   app.setGlobalPrefix(globalPrefix)
//   const port = process.env.PORT || 3000
//   await app.listen(port)
//   Logger.log(
//     `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
//   )
// }

// bootstrap()


import { bootstrap } from '@island.is/infra-nest-server'

import { AppModule } from './app/app.module'
// import { openApi } from './openApi'

bootstrap({
  appModule: AppModule,
  name: 'cf-prep-api',
  // openApi,
})

