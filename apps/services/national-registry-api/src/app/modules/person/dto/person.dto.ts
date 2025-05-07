import { ApiProperty } from "@nestjs/swagger"
import {IsEmail, IsString, Matches} from 'class-validator'
import { Person } from "../entities/person.entity"

export class PersonDto {
    constructor(person: Person) {
        this.address = person.address
        this.name = person.name
        this.email = person.email
        this.phoneNumber = person.phoneNumber
        this.nationalId = person.nationalId
    }

    @ApiProperty()
    @IsString()
    address: string
    @ApiProperty()
    @IsString()
    name: string
    @ApiProperty()
    @IsEmail()
    email: string
    @ApiProperty()
    @Matches(/^\d{3}-\d{4}$/, {
        message: 'Phone number must match format ###-####',
    })
    phoneNumber: string
    @ApiProperty()
    @Matches(/^\d{6}-\d{4}$/, {
        message: 'National ID match format ######-####',
    })
    nationalId: string
}