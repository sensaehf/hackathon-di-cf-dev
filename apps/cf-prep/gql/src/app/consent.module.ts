import { Module } from '@nestjs/common'
import { ConsentService } from './consent.service'
import { ConsentResolver } from './consent.resolver'
import { ApolloDriver } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { BackendAPI } from '../services'
import { environment } from '../environments'

const debug = process.env.NODE_ENV === 'development'
const playground = debug || process.env.GQL_PLAYGROUND_ENABLED === 'true'
const autoSchemaFile = environment.production
  ? true
  : 'apps/cf-prep/gql/src/api.graphql'

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug,
      playground,
      autoSchemaFile,
      path: '/api/graphql',
      dataSources: () => ({ backendApi: new BackendAPI() }),
      driver: ApolloDriver,
    }),
  ],
  providers: [ConsentResolver, ConsentService],
})
export class ConsentModule {}
