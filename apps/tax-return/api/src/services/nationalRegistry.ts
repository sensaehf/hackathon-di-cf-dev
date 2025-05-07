import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { environment } from '../environments'
import { Person } from "../app/modules/person/entities/person.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NationalRegistryApi extends RESTDataSource {
willSendRequest(req: RequestOptions) {
    req.headers.set('authorization', this.context.req.headers.authorization)
    req.headers.set('cookie', this.context.req.headers.cookie)
  }

  baseURL = `${environment.nationalRegistryApiUrl}/api`

  async getPerson(nationalId: string): Promise<Person> {
    console.log(nationalId)
      const response = await this.get<Person>('persons', undefined, {
        headers: {
          'X-Query-National-Id': nationalId,
        },
      })      
      return response
    }
}