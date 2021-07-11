import { GameText } from "@/scripts/controls/GameText";
import { FarmType } from "@/scripts/farm/FarmType";

export default abstract class PlantRequirement {

    abstract canPlant(farm: FarmType, row: number, col: number): boolean;
    
    abstract description: GameText[];

}