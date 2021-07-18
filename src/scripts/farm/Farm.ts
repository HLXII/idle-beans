import AbstractFarm from "./AbstractFarm";
import { FarmType } from "./FarmType";

export default class Farm extends AbstractFarm {
    
    maxLeguma: number = 100;
    
    constructor() {
        super(FarmType.plains, 'Plains');
    }

    canAccess(): boolean {
        return true;
    }

}