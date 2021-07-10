import { GameText } from "@/scripts/controls/GameText";

export default abstract class PlantUpgrade {
    
    public description: GameText[];

    constructor(public name: string, description: GameText | GameText[]) {
        if (Array.isArray(description)) {
            this.description = description;
        } else {
            this.description = [description];
        }
    }

}