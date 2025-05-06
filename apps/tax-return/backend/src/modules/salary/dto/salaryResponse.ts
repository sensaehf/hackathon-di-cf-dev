import { SalaryViewModel } from "./salaryViewModel.dto";

export class SalaryResponse {
    constructor(salaries: SalaryViewModel[]){
        this.salaries = salaries
    }

    salaries: SalaryViewModel[];
}
