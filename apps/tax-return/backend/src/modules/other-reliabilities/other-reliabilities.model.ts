import {
  AutoIncrement,
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

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'tax_submission_id',
  })
  taxSubmissionId!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  description!: string;

  @Column({
    type: DataType.DECIMAL,
  })
  interestAmount!: number;

  @Column({
    type: DataType.DECIMAL,
  })
  balance!: number;

  @Column({
    type: DataType.INTEGER,
  })
  year!: number;

  @Column({
    type: DataType.CHAR(3),
    allowNull: true
  })
  currency!: string;
}