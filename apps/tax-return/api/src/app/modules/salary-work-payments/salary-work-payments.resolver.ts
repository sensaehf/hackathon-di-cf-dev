import { Resolver, Query, Args, Int, Context, Mutation } from '@nestjs/graphql';
import { SalaryWorkPayments } from './entities/salary-work-payment.entity';
import { CreateSalaryWorkPaymentInput } from './dto/create-salary-work-payment.input';
import { BackendAPI } from '../../../services';

@Resolver(() => SalaryWorkPayments)
export class SalaryWorkPaymentsResolver {
  @Query(() => [SalaryWorkPayments], { name: 'findAllSalaryWorkPaymentsByTaxSubmission' })
  async findAllSalaryWorkPaymentsByTaxSubmission(
    @Context('dataSources') { backendApi } : { backendApi: BackendAPI },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<SalaryWorkPayments[]> {
    return await backendApi.getAllSalaryWorkPaymentsByTaxSubmission(taxSubmissionId);
  }

  @Mutation(() => SalaryWorkPayments, { name: 'createSalaryWorkPayment' })
  async createSalaryWorkPayment(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('createSalaryWorkPaymentInput') createSalaryWorkPaymentInput: CreateSalaryWorkPaymentInput,
  ): Promise<SalaryWorkPayments> {
    return await backendApi.createSalaryWorkPayment(createSalaryWorkPaymentInput);
  }
}