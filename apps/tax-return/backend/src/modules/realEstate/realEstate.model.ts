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

interface RealEstateAttributes {
  id: string
  taxSubmissionId: number
  address: string
  assessedValue: number
  currency: string
  created: Date
  modified: Date
}

interface RealEstateCreationAttributes
  extends Optional<RealEstateAttributes, 'id' | 'created' | 'modified'> {}

@Table({
  tableName: 'real_estate',
  indexes: [
    {
      fields: ['id'],
    },
  ],
})
export class RealEstate extends Model<
  RealEstateAttributes,
  RealEstateCreationAttributes
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
  address!: string

  @ApiProperty()
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  assessedValue!: number

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
