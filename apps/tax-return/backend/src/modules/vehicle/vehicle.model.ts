import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

interface VehicleAttributes {
  id: string
  taxSubmissionId: number
  currency: string
  purchasePrice: number
  purchaseYear: number
}

interface VehicleCreationAttributes
  extends Optional<VehicleAttributes, 'id'> { }

@Table({
  tableName: 'vehicle',
  indexes: [
    {
      fields: ['id', 'tax_submission_id'],
    },
  ],
})
export class Vehicle extends Model<
  VehicleAttributes,
  VehicleCreationAttributes
> {
  @ApiProperty()
  @PrimaryKey
  @Column({
    type: DataType.STRING(20),
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.STRING(20),
    field: 'id'
  })
  id!: string

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
    type: DataType.CHAR(3)
  })
  currency!: string

  @Column({
      field: 'purchase_price',
      type: DataType.DECIMAL
  })
  purchasePrice!: number

  @Column({
    field: 'purchase_year',
    type: DataType.INTEGER
  })
  purchaseYear!: number

  @Column
  modified!: Date


}
