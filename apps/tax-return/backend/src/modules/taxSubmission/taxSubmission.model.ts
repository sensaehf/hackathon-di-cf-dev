import {
  AutoIncrement,
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
  personId: number
  createdAt: Date
  taxYear: number
  submittedAt: Date
}

interface TaxSubmissionCreationAttributes
  extends Optional<TaxSubmissionAttributes, 'id'| 'createdAt' | 'submittedAt'> {}

@Table({
  tableName: 'tax_submission',
  indexes: [
    {
      fields: ['id', 'person_id'],
    },
    {
      unique: true,                // ✅ Make it a unique constraint
      fields: ['tax_year', 'person_id'],
      name: 'unique_tax_year_person_id', // optional, for better DB readability
    },
  ],
})
export class TaxSubmission extends Model<
  TaxSubmissionAttributes,
  TaxSubmissionCreationAttributes
> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'id'
  })
  id!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
    field: 'person_id'
  })
  personId!: number

  @CreatedAt
  @Column({
    field: 'created_at'
  })
  readonly createdAt!: Date

  @Column({
    field: 'submitted_at'
  })
  readonly submittedAt!: Date

  @Column({
    type: DataType.INTEGER,
    primaryKey: false,
    allowNull: false,
    field: 'tax_year'
  })
  taxYear!: number
}
