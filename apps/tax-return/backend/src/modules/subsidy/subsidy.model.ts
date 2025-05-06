import { ApiProperty } from '@nestjs/swagger'
import {
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
    field: 'tax_submission_id'
  })
  taxSubmissionId!: number

  @ApiProperty()
  @Column({
    type: DataType.DECIMAL
  })
  amount!: number

  @ApiProperty()
  @Column({
    type: DataType.CHAR(3)
  })
  currency!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING(255)
  })
  description!: string

  @ApiProperty()
  @Column({
    type: DataType.INTEGER
  })
  year!: number

  @Column({
    field: 'source_name',
    type: DataType.STRING(255)
  })
  sourceName!: string

  @Column({
    field: 'grant_type',
    type: DataType.STRING(100)
  })
  grantType!: string
  
  @Column
  modified!: Date


}
