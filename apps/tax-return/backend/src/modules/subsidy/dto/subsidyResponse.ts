import { ApiProperty } from "@nestjs/swagger";
import { SubsidyViewModel } from "./subsidyViewModel.dto";

export class SubsidyResponse {
    constructor(subs : SubsidyViewModel[]){
        this.subsidies = subs
    }

    @ApiProperty()
    subsidies: SubsidyViewModel[];
}