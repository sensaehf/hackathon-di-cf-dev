import { CreateSalaryWorkPaymentInput } from './create-salary-work-payment.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSalaryWorkPaymentInput extends PartialType(
  CreateSalaryWorkPaymentInput,
) {
  @Field(() => Int)
  id!: number
}
