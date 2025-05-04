import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

interface ConsentAttributes {
  id: string
  nationalId: string
  created: Date
  modified: Date,
  consented: boolean
}

interface ResourceCreationAttributes
  extends Optional<ConsentAttributes, 'id' | 'created' | 'modified' | 'consented'> {}

@Table({
  tableName: 'consent',
  indexes: [
    {
      fields: ['national_id'],
    },
  ],
})
export class Consent extends Model<
  ConsentAttributes,
  ResourceCreationAttributes
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
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  nationalId!: string

  @ApiProperty()
  @CreatedAt
  readonly created!: Date

  @ApiProperty()
  @UpdatedAt
  readonly modified!: Date

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  consented!: boolean

}
