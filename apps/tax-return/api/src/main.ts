import { bootstrap } from '@island.is/infra-nest-server'
 
import { AppModule } from './app/app.module'
const allowedOrigins = [
  'http://localhost:4200', // Allow requests from this origin
  'https://cf-web.sensa-di.scm.is' // Allow requests from this origin
]
bootstrap({
  appModule: AppModule,
  name: 'tax-return-api',
  port: 3333,
  enableCors: {
    origin: allowedOrigins, // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies or other credentials
  },
})
 