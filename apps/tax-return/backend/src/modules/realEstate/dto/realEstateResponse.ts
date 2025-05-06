import { RealEstateViewModel } from "./realEstate.dto";
export class RealEstateResponse {
    constructor(realEstate: RealEstateViewModel[]){
        this.realEstate = realEstate
    }
    realEstate: RealEstateViewModel []
}