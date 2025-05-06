import { RealEstateViewModel } from "./realEstate.dto";
export class RealEstateResponse {
    constructor(realEstates: RealEstateViewModel[]){
        this.realEstates = realEstates
    }
    realEstates: RealEstateViewModel []
}