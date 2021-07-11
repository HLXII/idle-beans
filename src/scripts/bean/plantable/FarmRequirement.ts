import { GameText } from "@/scripts/controls/GameText";
import { FarmType } from "@/scripts/farm/FarmType";
import PlantRequirement from "./PlantRequirement";

export default class FarmRequirement extends PlantRequirement {
    
    constructor(public farm: FarmType) { 
        super();
    }

    canPlant(farm: FarmType, row: number, col: number) {
        return farm === this.farm;
    }

    get description(): GameText[] {
        return [
            `Must be planted in the ${this.farm}`,
        ];
    }
}