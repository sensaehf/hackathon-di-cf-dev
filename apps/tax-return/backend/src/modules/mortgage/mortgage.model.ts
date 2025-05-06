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

interface MortgageAttributes {
  id: string
  nationalId: string
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
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: string

  @ApiProperty()
  //@ForeignKey(() => TaxSubmission)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  taxSubmissionId!: number

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
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
    unique: true,
  })
  description!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  startDate!: string

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    unique: true,
  })
  termYears!: number

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  purchaseYear!: string

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    unique: true,
  })
  totalAnnualPayments!: string

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  principalRepayment!: string

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    unique: true,
  })
  interestAmount!: string

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    unique: true,
  })
  outstandingBalance!: string

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  year!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  currency!: string

  @ApiProperty()
  @CreatedAt
  readonly created!: Date

  @ApiProperty()
  @UpdatedAt
  readonly modified!: Date
}
