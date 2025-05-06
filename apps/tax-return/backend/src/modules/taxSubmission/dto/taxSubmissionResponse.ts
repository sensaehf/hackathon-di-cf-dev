import { TaxSubmissionViewModel } from "./taxSubmissionViewModel.dto";

export class TaxSubmissionResponse {
    constructor(subs: TaxSubmissionViewModel[]){
        this.submissions = subs
    }

    submissions: TaxSubmissionViewModel[];
}
