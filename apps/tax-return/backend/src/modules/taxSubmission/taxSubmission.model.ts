import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

interface TaxSubmissionAttributes {
  id: number
  person_id: number
  created_at: Date
  tax_year: number
  submitted_at: Date
}

interface TaxSubmissionCreationAttributes
  extends Optional<TaxSubmissionAttributes, 'id'| 'created_at' | 'submitted_at'> {}

@Table({
  tableName: 'tax_submission',
  indexes: [
    {
      fields: ['id', 'person_id'],
    },
  ],
})
export class TaxSubmission extends Model<
  TaxSubmissionAttributes,
  TaxSubmissionCreationAttributes
> {
  @ApiProperty()
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.INTEGER,
    field: 'id'
  })
  id!: number

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
    field: 'person_id'
  })
  personId!: number

  @ApiProperty()
  @CreatedAt
  @Column({
    field: 'created_at'
  })
  readonly createdAt!: Date

  @ApiProperty()
  @Column({
    field: 'submitted_at'
  })
  readonly submittedAt!: Date

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: false,
    allowNull: false,
    field: 'tax_year'
  })
  taxYear!: number
}
