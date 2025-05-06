import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { SalaryWorkPayments } from './entities/salary-work-payment.entity';

@Resolver(() => SalaryWorkPayments)
export class SalaryWorkPaymentsResolver {
  @Query(() => [SalaryWorkPayments], { name: 'findAllSalaryWorkPaymentsByTaxSubmission' })
  async findAllSalaryWorkPaymentsByTaxSubmission(
    @Context('dataSources') { backendApi },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<SalaryWorkPayments[]> {
    return await backendApi.getAllSalaryWorkPaymentsByTaxSubmission(taxSubmissionId);
  }
}