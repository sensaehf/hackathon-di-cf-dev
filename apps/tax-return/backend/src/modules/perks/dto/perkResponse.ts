import { PerkViewModel } from "./perkViewModel.dto";

export class PerkResponse {
    constructor( perks : PerkViewModel[]){
        this.perks = perks
    }
    
    perks: PerkViewModel[];
}