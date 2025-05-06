import { ApiProperty } from "@nestjs/swagger";
import { Mortgage } from "../mortgage.model";

export class MortgageViewModel {
    constructor(mortgage: Mortgage){
        this.id = mortgage.id
        this.taxSubmissionId = mortgage.taxSubmissionId
        this.lenderName = mortgage.lenderName
        this.type = mortgage.type
        this.startDate = mortgage.startDate
        this.termYears = mortgage.termYears
        this.purchaseYear = mortgage.purchaseYear
        this.totalAnnualPayments = mortgage.totalAnnualPayments
        this.principalRepayment = mortgage.principalRepayment
        this.interestAmount = mortgage.interestAmount
        this.outstandingBalance = mortgage.outstandingBalance
        this.year = mortgage.year
        this.currency = mortgage.currency
    }

    @ApiProperty()
    id!: string
    @ApiProperty()
    taxSubmissionId!: number
    @ApiProperty()
    lenderName!: string
    @ApiProperty()
    type!: string
    @ApiProperty()
    startDate: Date
    @ApiProperty()
    termYears: number
    @ApiProperty()
    purchaseYear: number
    @ApiProperty()
    totalAnnualPayments: number
    @ApiProperty()
    principalRepayment: number
    @ApiProperty()
    interestAmount: number
    @ApiProperty()
    outstandingBalance: number
    @ApiProperty()
    year: number
    @ApiProperty()
    currency: string
}