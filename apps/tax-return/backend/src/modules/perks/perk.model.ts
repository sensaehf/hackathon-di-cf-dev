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

interface PerkAttributes {
  id: number
  taxSubmissionId: number
  type: string
  amount: number
  currency: string
  description: string
}

interface PerkCreationAttributes
  extends Optional<PerkAttributes, 'id'> {}

@Table({
  tableName: 'per_diem_and_perks',
  indexes: [
    {
      fields: ['id', 'tax_submission_id'],
    },
  ],
})
export class Perk extends Model<
  PerkAttributes,
  PerkCreationAttributes
> {
  @ApiProperty()
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
    field:'tax_submission_id'
  })  
  taxSubmissionId!: number

  @Column
  type!: string

  @Column({
    type: DataType.DECIMAL
  })
  amount!: number

  @Column({
    type: DataType.CHAR(3)
  })
  currency!: string

  @Column({
    type: DataType.STRING(255)
  })
  description!: string
  
}
