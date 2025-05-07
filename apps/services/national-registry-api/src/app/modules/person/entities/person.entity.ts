import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    CreatedAt,
  } from 'sequelize-typescript'
  import { ApiProperty } from '@nestjs/swagger'

  interface PersonAttributes {
    nationalId: string
    name: string
    address: string
    email: string
    phoneNumber: string
  }
  
  @Table({ tableName: 'person' })
  export class Person extends Model<PersonAttributes>
   {
    @ApiProperty()
    @PrimaryKey
    @Column({
      type: DataType.STRING(11), // e.g., "120389-4569"
      allowNull: false,
      unique: true,
      field: 'national_id',
    })
    nationalId!: string
  
    @ApiProperty()
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    name!: string
  
    @ApiProperty()
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    address!: string
  
    @ApiProperty()
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    email!: string
  
    @ApiProperty()
    @Column({
      type: DataType.STRING(8), // e.g., "772-8391"
      allowNull: false,
      field: 'phone_number',
    })
    phoneNumber!: string

    @CreatedAt
    @Column({
        type: DataType.DATE
    })
    created!: Date

  }
  