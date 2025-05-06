import { Injectable } from '@nestjs/common'
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'

import { environment } from '../environments'
import { TaxSubmission } from '../app/modules/tax-submission/entities/tax-submission.entity'

@Injectable()
class BackendAPI extends RESTDataSource {
  willSendRequest(req: RequestOptions) {
    req.headers.set('authorization', this.context.req.headers.authorization)
    req.headers.set('cookie', this.context.req.headers.cookie)
  }

  baseURL = `${environment.backendUrl}/api`

  createTaxSubmission(body: Record<string, unknown>): Promise<TaxSubmission> {
    // Temp Mock data
    return Promise.resolve({
      id: 1,
      personId: body.personId as number,
      taxYear: body.taxYear as number,
      createdAt: new Date(),
    } as unknown as TaxSubmission)

    // return this.post('tax-submissions', body)
  }

  getAllTaxSubmissions(): Promise<TaxSubmission[]> {
    // Temp Mock data
    return Promise.resolve([
        {
          id: 1,
          personId: 123,
          taxYear: 2025,
          createdAt: new Date(),
        },
        {
          id: 2,
          personId: 456,
          taxYear: 2024,
          createdAt: new Date(),
        },
      ] as unknown as TaxSubmission[])

    // return this.get('tax-submissions')
  }

  getTaxSubmissionById(id: number): Promise<TaxSubmission> {
    // Temp Mock data
    return Promise.resolve({
      id: id,
      personId: 123,
      taxYear: 2025,
      createdAt: new Date(),
    } as unknown as TaxSubmission)

    // return this.get(`tax-submissions/${id}`)
  }

  updateTaxSubmission(id: number, body: Record<string, unknown>): Promise<TaxSubmission> {
    // Temp Mock data
    return Promise.resolve({
      id: id,
      personId: body.personId as number,
      taxYear: body.taxYear as number,
      createdAt: new Date(),
    } as unknown as TaxSubmission)

    // return this.put(`tax-submissions/${id}`, body)
  }

  deleteTaxSubmission(id: number): Promise<void> {
    // Temp Mock data
    return Promise.resolve()

    // return this.delete(`tax-submissions/${id}`)
  }
}

export default BackendAPI