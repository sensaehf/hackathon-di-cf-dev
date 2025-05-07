import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import { Optional } from 'sequelize/types'
import { TaxSubmission } from '../taxSubmission/taxSubmission.model'

interface MortgageAttributes {
  id: string
  taxSubmissionId: number
  lenderName: string
  type: string
  description: string
  startDate: Date
  termYears: number
  purchaseYear: number
  totalAnnualPayments: number
  principalRepayment: number
  interestAmount: number
  outstandingBalance: number
  currency: string
  created: Date
  modified: Date
}

interface MortgageCreationAttributes
  extends Optional<MortgageAttributes, 'id' | 'created' | 'modified'> {}

@Table({
  tableName: 'mortgage_interest',
  indexes: [
    {
      fields: ['id'],
    },
  ],
})
export class Mortgage extends Model<
  MortgageAttributes,
  MortgageCreationAttributes
> {
  @ApiProperty()
  @Column({
    type: DataType.STRING(50),
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.STRING(50),
  })
  id!: string

  @ApiProperty()
  @ForeignKey(() => TaxSubmission)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  taxSubmissionId!: number

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lenderName!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate!: Date

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  termYears!: number

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  purchaseYear!: number

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  totalAnnualPayments!: number

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  principalRepayment!: number

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  interestAmount!: number

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  outstandingBalance!: number

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  year!: number

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency!: string

  @ApiProperty()
  @CreatedAt
  readonly created!: Date

  @ApiProperty()
  @UpdatedAt
  readonly modified!: Date
}
