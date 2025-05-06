import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { SalaryWorkPayment } from './entities/salary-work-payment.entity'
import { CreateSalaryWorkPaymentInput } from './dto/create-salary-work-payment.input'
import { UpdateSalaryWorkPaymentInput } from './dto/update-salary-work-payment.input'

@Resolver(() => SalaryWorkPayment)
export class SalaryWorkPaymentsResolver {
  constructor(
    private readonly salaryWorkPaymentsService: SalaryWorkPaymentsService,
  ) {}

  @Mutation(() => SalaryWorkPayment)
  createSalaryWorkPayment(
    @Args('createSalaryWorkPaymentInput')
    createSalaryWorkPaymentInput: CreateSalaryWorkPaymentInput,
  ) {
    return this.salaryWorkPaymentsService.create(createSalaryWorkPaymentInput)
  }

  @Query(() => [SalaryWorkPayment], { name: 'salaryWorkPayments' })
  findAll() {
    return this.salaryWorkPaymentsService.findAll()
  }

  @Query(() => SalaryWorkPayment, { name: 'salaryWorkPayment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.salaryWorkPaymentsService.findOne(id)
  }

  @Mutation(() => SalaryWorkPayment)
  updateSalaryWorkPayment(
    @Args('updateSalaryWorkPaymentInput')
    updateSalaryWorkPaymentInput: UpdateSalaryWorkPaymentInput,
  ) {
    return this.salaryWorkPaymentsService.update(
      updateSalaryWorkPaymentInput.id,
      updateSalaryWorkPaymentInput,
    )
  }

  @Mutation(() => SalaryWorkPayment)
  removeSalaryWorkPayment(@Args('id', { type: () => Int }) id: number) {
    return this.salaryWorkPaymentsService.remove(id)
  }
}
