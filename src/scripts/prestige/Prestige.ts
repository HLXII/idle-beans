import { Features } from "@/Features";
import { GameText } from "../controls/GameText";

export default abstract class Prestige {

    constructor(features: Features) { 
        return;
    }

    abstract name: string;

    abstract description: GameText[];

    abstract visible: boolean;

    abstract canPrestige: boolean;

    abstract reward: number;

    abstract label: string;

    abstract percent: number;

    abstract text: string;

    triggerPrestige() {
        // Sanity check to ensure we can prestige
        if (!this.canPrestige) {
            return;
        }

        // Gain reward
        


        // Cleanup game state for prestige

    }

}