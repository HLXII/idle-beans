import { GameText } from "@/scripts/controls/GameText";
import { NoRequirement, Requirement } from "incremental-game-template";

export default abstract class PlantUpgrade {
    
    public description: GameText[];

    constructor(public name: string, description: GameText | GameText[], public prevUpgrade: string = "", public requirement: Requirement = new NoRequirement()) {
        if (Array.isArray(description)) {
            this.description = description;
        } else {
            this.description = [description];
        }
    }

}