import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import {
  Column,
  CreatedAt,
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
    {
      unique: true,
      fields: ['id', 'tax_submission_id'],
      name: 'unique_id_tax_submission_id'
    }
  ],
})
export class Vehicle extends Model<
  VehicleAttributes,
  VehicleCreationAttributes
> {
  @ApiProperty()
  @PrimaryKey
  @IsString()
  @Column({
    type: DataType.STRING(20),
    primaryKey: true,
    allowNull: false,
    field: 'id'
  })
  id!: string

  @ApiProperty()
  @IsNumber()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
    field: 'tax_submission_id'
  })
  taxSubmissionId!: number

  @ApiProperty()
  @IsString()
  @Column({
    type: DataType.CHAR(3)
  })
  currency!: string

  @IsNumber()
  @Column({
      field: 'purchase_price',
      type: DataType.DECIMAL
  })
  purchasePrice!: number

  @IsNumber()
  @Column({
    field: 'purchase_year',
    type: DataType.INTEGER
  })
  purchaseYear!: number

  @CreatedAt
  @Column
  created!: Date

  @Column
  modified!: Date


}
