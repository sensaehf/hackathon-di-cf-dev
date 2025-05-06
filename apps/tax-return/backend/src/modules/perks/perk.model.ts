import { ApiProperty } from '@nestjs/swagger'
import {
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
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.INTEGER,
    field: 'id'
  })
  id!: number

  @Column({
    field:'tax_submission_id'
  })
  taxSubmissionId!: number

  
}
