import { MortgageViewModel } from "./mortgage.dto";
export class MortgageResponse {
    constructor(mortgages: MortgageViewModel[]){
        this.mortgages = mortgages
    }
    mortgages: MortgageViewModel []
}