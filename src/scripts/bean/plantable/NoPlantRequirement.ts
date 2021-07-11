import { GameText } from "@/scripts/controls/GameText";
import { FarmType } from "@/scripts/farm/FarmType";
import PlantRequirement from "./PlantRequirement";

export default class NoPlantRequirement extends PlantRequirement {
    
    canPlant(_farm: FarmType, _row: number, _col: number) {
        return true;
    }

    get description(): GameText[] {
        return ['Can be planted anywhere.'];
    }

}