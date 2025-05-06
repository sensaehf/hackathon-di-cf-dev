import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize/types';

interface OtherReliabilitiesAttributes {
  id: number;
  taxSubmissionId: number;
  description: string;
  interestAmount: number;
  balance: number;
  year: number;
  currency: string;
}

interface OtherReliabilitiesCreationAttributes
  extends Optional<OtherReliabilitiesAttributes, 'id'> {}

@Table({
  tableName: 'other_reliabilities',
  indexes: [
    {
      fields: ['id', 'tax_submission_id'],
    },
  ],
})
export class OtherReliabilities extends Model<
  OtherReliabilitiesAttributes,
  OtherReliabilitiesCreationAttributes
> {
  @ApiProperty()
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'id',
  })
  id!: number;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'tax_submission_id',
  })
  taxSubmissionId!: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING(255),
  })
  description!: string;

  @ApiProperty()
  @Column({
    type: DataType.DECIMAL,
  })
  interestAmount!: number;

  @ApiProperty()
  @Column({
    type: DataType.DECIMAL,
  })
  balance!: number;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
  })
  year!: number;

  @ApiProperty()
  @Column({
    type: DataType.CHAR(3),
  })
  currency!: string;
}