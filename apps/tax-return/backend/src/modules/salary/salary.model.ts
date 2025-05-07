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

interface SalaryAttributes {
  id: number,
  taxSubmissionId: number,
  employerName: string,
  amount: number,
  currency: string,
  description: string,
  year: number
}

interface SalaryCreationAttributes
  extends Optional<SalaryAttributes, 'id'> {}

@Table({
  tableName: 'salary_work_payments',
  indexes: [
    {
      fields: ['id', 'person_id'],
    },
  ],
})
export class Salary extends Model<
  SalaryAttributes,
  SalaryCreationAttributes
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
    field: 'employer_name'
  })
  employerName!: string

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
  
  @Column
  modified!: Date


}
