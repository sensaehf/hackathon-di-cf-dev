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
import { CreateOtherReliabilityInput } from '../app/modules/other-reliabilities/dto/create-other-reliability.input';
import { CreateMortgageInterestInput } from '../app/modules/mortgage-interest/dto/create-mortgage-interest.input';
import { CreatePensionsGrantsSubsidyInput } from '../app/modules/pensions-grants-subsidies/dto/create-pensions-grants-subsidy.input';
import { CreatePerDiemAndPerkInput } from '../app/modules/per-diem-and-perks/dto/create-per-diem-and-perk.input';
import { CreateRealEstateInput } from '../app/modules/real-estate/dto/create-real-estate.input';
import { CreateSalaryWorkPaymentInput } from '../app/modules/salary-work-payments/dto/create-salary-work-payment.input';
import { CreateVehicleInput } from '../app/modules/vehicle/dto/create-vehicle.input';
import { UpdateMortgageInterestInput } from '../app/modules/mortgage-interest/dto/update-mortgage-interest.input';
import { UpdateOtherReliabilityInput } from '../app/modules/other-reliabilities/dto/update-other-reliability.input';

@Injectable()
export class BackendAPI extends RESTDataSource {
  willSendRequest(req: RequestOptions) {
    req.headers.set('authorization', this.context.req.headers.authorization)
    req.headers.set('cookie', this.context.req.headers.cookie)
  }

  baseURL = `${environment.backendUrl}/v1`

  // -------------- Tax Submission ----------------

  async getAllTaxSubmissionsForUser(personId: number): Promise<TaxSubmission[]> {
    const response = await this.get<{ submissions: TaxSubmission[] }>('tax-submissions', undefined, {
      headers: {
        'X-Query-National-Id': personId.toString(),
      },
    })
  
    return response.submissions
  }

  // -------------- Mortgage Interest ----------------

  async getAllMortgageInterestsByTaxSubmission(taxSubmissionId: number): Promise<MortgageInterest[]> {
    const response = await this.get<{ mortgages: MortgageInterest[] }>(
      `tax-submissions/${taxSubmissionId}/mortgages`
    );

    return response.mortgages;
  }

  async createMortgageInterest(body: CreateMortgageInterestInput): Promise<MortgageInterest> {
    const response = await this.post<MortgageInterest>(
      `tax-submissions/${body.taxSubmissionId}/mortgages`,
      body,
    );
    return response;
  }

  async updateMortgageInterest(body: UpdateMortgageInterestInput): Promise<MortgageInterest> {
    const { taxSubmissionId, ...rest } = body;
    const response = await this.put<MortgageInterest>(
      `tax-submissions/${body.taxSubmissionId}/mortgages/${body.id}`,
      rest,
    );
    return response;
  }
  
  async deleteMortgageInterest(id: string, taxSubmissionId: number): Promise<number> {
    const response = await this.delete<number>(
      `tax-submissions/${taxSubmissionId}/mortgages/${id}`,
    );
    return response;
  }
  
  // -------------- Other Reliabilities ----------------

  async getAllOtherReliabilitiesByTaxSubmission(taxSubmissionId: number): Promise<OtherReliabilities[]> {
    const response = await this.get<{ otherReliabilities: OtherReliabilities[] }>(
      `tax-submissions/${taxSubmissionId}/other-reliabilities`
    );
    
    return response.otherReliabilities;
  }

  async createOtherReliability(body: CreateOtherReliabilityInput): Promise<OtherReliabilities> {
    const response = await this.post<OtherReliabilities>(
      `tax-submissions/${body.taxSubmissionId}/other-reliabilities`,
      body,
    );

    return response;
  }

  async updateOtherReliability(body: UpdateOtherReliabilityInput): Promise<OtherReliabilities> {
    const { taxSubmissionId, id, ...rest } = body;
    const response = await this.put<OtherReliabilities>(
      `tax-submissions/${body.taxSubmissionId}/other-reliabilities/${body.id}`,
      rest,
    );
    return response;
  }
  
  async deleteOtherReliability(id: number, taxSubmissionId: number): Promise<boolean> {
    const response = await this.delete<boolean>(
      `tax-submissions/${taxSubmissionId}/other-reliabilities/${id}`,
    );
    return response;
  }

  // -------------- Pensions, Grants and Subsidies ----------------
  
  async getAllPensionsGrantsSubsidiesByTaxSubmission(taxSubmissionId: number): Promise<PensionsGrantsSubsidies[]> {
    const response = await this.get<{ subsidies: PensionsGrantsSubsidies[] }>(
      `tax-submissions/${taxSubmissionId}/subsidies`
    );
    return response.subsidies;
  }

  async createPensionsGrantsSubsidy(body: CreatePensionsGrantsSubsidyInput): Promise<PensionsGrantsSubsidies> {
    const { taxSubmissionId, ...rest } = body;
    const response = await this.post<PensionsGrantsSubsidies>(
      `tax-submissions/${body.taxSubmissionId}/subsidies`,
      rest,
    );
    return response;
  }
  
  // -------------- Per Diem and Perks ----------------

  async getAllPerDiemAndPerksByTaxSubmission(taxSubmissionId: number): Promise<PerDiemAndPerks[]> {
    
    const response = await this.get<{ perks: PerDiemAndPerks[] }>(
      `tax-submissions/${taxSubmissionId}/perks`
    );
    return response.perks;
  }

  async createPerDiemAndPerk(body: CreatePerDiemAndPerkInput): Promise<PerDiemAndPerks> {
    const { taxSubmissionId, ...rest } = body;
    const response = await this.post<PerDiemAndPerks>(
      `tax-submissions/${body.taxSubmissionId}/perks`,
      rest,
    );
    return response;
  }

  // -------------- Real Estate ----------------
  
  async getAllRealEstatesByTaxSubmission(taxSubmissionId: number): Promise<RealEstate[]> {
    const response = await this.get<{ realEstates: RealEstate[] }>(
      `tax-submissions/${taxSubmissionId}/real-estates`
    );

    return response.realEstates;
  }

  async createRealEstate(body: CreateRealEstateInput): Promise<RealEstate> {
    const { taxSubmissionId, ...rest } = body;
    const response = await this.post<RealEstate>(
      `tax-submissions/${body.taxSubmissionId}/real-estates`,
      rest,
    );
    return response;
  }

  // -------------- Salary Work Payments ----------------
  
  async getAllSalaryWorkPaymentsByTaxSubmission(taxSubmissionId: number): Promise<SalaryWorkPayments[]> {
    const response = await this.get<{ salaries: SalaryWorkPayments[] }>(
      `tax-submissions/${taxSubmissionId}/salaries`
    );
    return response.salaries;
  }

  async createSalaryWorkPayment(body: CreateSalaryWorkPaymentInput): Promise<SalaryWorkPayments> {
    const response = await this.post<SalaryWorkPayments>(
      `tax-submissions/${body.taxSubmissionId}/salaries`,
      body,
    );
    return response;
  }

  // -------------- Vehicles ----------------
  
  async getAllVehiclesByTaxSubmission(taxSubmissionId: number): Promise<Vehicle[]> {
    const response = await this.get<{ vehicles: Vehicle[] }>(
      `tax-submissions/${taxSubmissionId}/vehicles`
    );
    return response.vehicles;
  }

  async createVehicle(body: CreateVehicleInput): Promise<Vehicle> {
    const { taxSubmissionId, ...rest } = body;
    const response = await this.post<Vehicle>(
      `tax-submissions/${body.taxSubmissionId}/vehicles`,
      rest,
    );
    return response;
  }
}

export default BackendAPI