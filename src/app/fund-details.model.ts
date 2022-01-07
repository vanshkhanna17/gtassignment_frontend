import { DataModel } from "./data.model";
import { MetaModel } from "./meta.model";


export class FundDetails {
    constructor (public meta: MetaModel, public data: DataModel[], public status: string) {}
}
