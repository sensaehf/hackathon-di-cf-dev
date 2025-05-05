import { bootstrap } from '@island.is/infra-nest-server'
import { AppModule } from './app/app.module'
import { openApi } from './openApi'

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule)
//   const globalPrefix = 'api'
//   app.setGlobalPrefix(globalPrefix)
//   const port = process.env.PORT || 3000
//   await app.listen(port)
//   Logger.log(
//     `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
//   )
// }

// bootstrap()

bootstrap({
  appModule: AppModule,
  name: 'tax-return-backend',
  port: 3000,
  swaggerPath: 'api/swagger',
  openApi,
})