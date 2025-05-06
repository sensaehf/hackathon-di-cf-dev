import { ApiProperty } from "@nestjs/swagger";
import { Salary } from "../salary.model";

export class SalaryViewModel {
    constructor(salary: Salary){
        this.id = salary.id
        this.taxSubmissionId = salary.taxSubmissionId
        this.employerName = salary.employerName
        this.amount = salary.amount
        this.currency = salary.currency
        this.description = salary.description
        this.year = salary.year
    }
    
    @ApiProperty()
    id: number
    
    @ApiProperty()
    taxSubmissionId: number
    
    @ApiProperty()
    employerName: string
    
    @ApiProperty()
    amount: number
    
    @ApiProperty()
    currency: string

    @ApiProperty()
    description: string

    @ApiProperty()
    year: number
}

