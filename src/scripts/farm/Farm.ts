import AbstractFarm from "./AbstractFarm";
import { FarmType } from "./FarmType";

export default class Farm extends AbstractFarm {
    
    constructor() {
        super(FarmType.farm);
    }

    canAccess(): boolean {
        return true;
    }

}