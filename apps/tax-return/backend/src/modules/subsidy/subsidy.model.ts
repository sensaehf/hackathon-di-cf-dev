import { ApiProperty } from '@nestjs/swagger'
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

interface SubsidyAttributes {
  id: number
  taxSubmissionId: number
  amount: number
  currency: string
  description: string
  year: number
  grantType: string
  sourceName: string
}

interface SubsidyCreationAttributes
  extends Optional<SubsidyAttributes, 'id'> {}

@Table({
  tableName: 'pensions_grants_subsidies',
  indexes: [
    {
      fields: ['id', 'person_id'],
    },
  ],
})
export class Subsidy extends Model<
  SubsidyAttributes,
  SubsidyCreationAttributes
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
    field: 'tax_submission_id'
  })
  taxSubmissionId!: number

  @Column({
    type: DataType.DECIMAL
  })
  amount!: number

  @Column({
    type: DataType.CHAR(3),
    allowNull: true
  })
  currency!: string

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  description!: string

  @Column({
    type: DataType.INTEGER
  })
  year!: number

  @Column({
    field: 'source_name',
    type: DataType.STRING(255),
    allowNull: true
  })
  sourceName!: string

  @Column({
    field: 'grant_type',
    type: DataType.STRING(100),
    allowNull: true
  })
  grantType!: string
  
  @Column
  modified!: Date


}
