import { OtherReliabilitiesViewModel } from "./reliability.dto";

export class OtherReliabilitiesResponse {
    constructor(otherReliabilities: OtherReliabilitiesViewModel[]) {
        this.otherReliabilities = otherReliabilities;
    }

    otherReliabilities: OtherReliabilitiesViewModel[];
}