import { Resolver, Query, Args, Int, Context, Mutation } from '@nestjs/graphql';
import { SalaryWorkPayments } from './entities/salary-work-payment.entity';
import { CreateSalaryWorkPaymentInput } from './dto/create-salary-work-payment.input';
import { BackendAPI } from '../../../services';
import { UpdateSalaryWorkPaymentInput } from './dto/update-salary-work-payment.input';

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

  @Mutation(() => SalaryWorkPayments, { name: 'updateSalaryWorkPayment' })
  async updateSalaryWorkPayment(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('updateSalaryWorkPaymentInput') updateSalaryWorkPaymentInput: UpdateSalaryWorkPaymentInput,
  ): Promise<SalaryWorkPayments> {
    return await backendApi.updateSalaryWorkPayment(updateSalaryWorkPaymentInput);
  }

  @Mutation(() => Int, { name: 'deleteSalaryWorkPayment' })
  async deleteSalaryWorkPayment(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('id', { type: () => String }) id: string,
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<boolean> {
    return await backendApi.deleteSalaryWorkPayment(id, taxSubmissionId);
  }
}