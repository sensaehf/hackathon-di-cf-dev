import { Injectable } from '@nestjs/common'
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'

import { environment } from '../environments'
import { TaxSubmission } from '../app/modules/tax-submission/entities/tax-submission.entity'
import { MortgageInterest } from '../app/modules/mortgage-interest/entities/mortgage-interest.entity';
import { RealEstate } from '../app/modules/real-estate/entities/real-estate.entity';
import { Vehicle } from '../app/modules/vehicle/entities/vehicle.entity';
import { OtherReliabilities } from '../app/modules/other-reliabilities/entities/other-reliability.entity';
import { PensionsGrantsSubsidies } from '../app/modules/pensions-grants-subsidies/entities/pensions-grants-subsidy.entity';
import { PerDiemAndPerks } from '../app/modules/per-diem-and-perks/entities/per-diem-and-perk.entity';
import { SalaryWorkPayments } from '../app/modules/salary-work-payments/entities/salary-work-payment.entity';
import { logger } from '@island.is/logging';

@Injectable()
export class BackendAPI extends RESTDataSource {
  willSendRequest(req: RequestOptions) {
    req.headers.set('authorization', this.context.req.headers.authorization)
    req.headers.set('cookie', this.context.req.headers.cookie)
  }

  baseURL = `${environment.backendUrl}/v1`

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

  async getAllTaxSubmissionsForUser(personId: number): Promise<TaxSubmission[]> {
    const response = await this.get<{ submissions: TaxSubmission[] }>('tax-submissions', undefined, {
      headers: {
        'X-Query-National-Id': personId.toString(),
      },
    })
  
    return response.submissions
  }

  async getAllMortgageInterestsByTaxSubmission(taxSubmissionId: number): Promise<MortgageInterest[]> {
    const response = await this.get<{ mortgages: MortgageInterest[] }>(
      `tax-submissions/${taxSubmissionId}/mortgages`
    );

    return response.mortgages;
  }
  
  async getAllOtherReliabilitiesByTaxSubmission(taxSubmissionId: number): Promise<OtherReliabilities[]> {
    const response = await this.get<{ otherReliabilities: OtherReliabilities[] }>(
      `tax-submissions/${taxSubmissionId}/other-reliabilities`
    );
    return response.otherReliabilities;
  }
  
  async getAllPensionsGrantsSubsidiesByTaxSubmission(taxSubmissionId: number): Promise<PensionsGrantsSubsidies[]> {
    const response = await this.get<{ pensionsGrantsSubsidies: PensionsGrantsSubsidies[] }>(
      `tax-submissions/${taxSubmissionId}/subsidies`
    );
    return response.pensionsGrantsSubsidies;
  }
  
  async getAllPerDiemAndPerksByTaxSubmission(taxSubmissionId: number): Promise<PerDiemAndPerks[]> {
    const response = await this.get<{ perDiemAndPerks: PerDiemAndPerks[] }>(
      `tax-submissions/${taxSubmissionId}/perks`
    );
    return response.perDiemAndPerks;
  }
  
  async getAllRealEstatesByTaxSubmission(taxSubmissionId: number): Promise<RealEstate[]> {
    const response = await this.get<{ realEstates: RealEstate[] }>(
      `tax-submissions/${taxSubmissionId}/real-estates`
    );
    return response.realEstates;
  }
  
  async getAllSalaryWorkPaymentsByTaxSubmission(taxSubmissionId: number): Promise<SalaryWorkPayments[]> {
    const response = await this.get<{ salaries: SalaryWorkPayments[] }>(
      `tax-submissions/${taxSubmissionId}/salaries`
    );
    return response.salaries;
  }
  
  async getAllVehiclesByTaxSubmission(taxSubmissionId: number): Promise<Vehicle[]> {
    const response = await this.get<{ vehicles: Vehicle[] }>(
      `tax-submissions/${taxSubmissionId}/vehicles`
    );
    return response.vehicles;
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