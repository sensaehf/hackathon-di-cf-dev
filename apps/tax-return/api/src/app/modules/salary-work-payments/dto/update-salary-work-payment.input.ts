import { IsString } from 'class-validator'
import { CreateSalaryWorkPaymentInput } from './create-salary-work-payment.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSalaryWorkPaymentInput extends PartialType(
  CreateSalaryWorkPaymentInput,
) {
  @Field(() => String)
  @IsString()
  id!: number
}
