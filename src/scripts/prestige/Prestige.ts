import { Features } from "@/Features";
import { BeanType } from "../bean/BeanList";
import Beans from "../bean/Beans";
import { GameText } from "../controls/GameText";
import PrestigeHandler from "./PrestigeHandler";

export default abstract class Prestige {

    private prestiges: PrestigeHandler;
    private beans: Beans;

    constructor(features: Features) { 
        this.prestiges = features.prestige;
        this.beans = features.beans;
    }

    abstract name: string;

    abstract description: GameText[];

    abstract visible: boolean;

    abstract canPrestige: boolean;

    abstract reward: {[bean in BeanType]?: number};

    abstract label: string;

    abstract percent: number;

    abstract text: string;

    get rewardText(): string {
        return 'Prestige for:<br>';
    }

    applyModifiers(value: number) {
       return this.prestiges.applyModifiers(value); 
    }

    triggerPrestige() {
        // Sanity check to ensure we can prestige
        if (!this.canPrestige) {
            return;
        }

        // Gain reward
        const rewards = this.reward;
        for (const bean in rewards) {
            this.beans.gain(bean as BeanType, rewards[bean as BeanType]);
        }

        // Cleanup game state for prestige
        this.prestiges.triggerPrestige();
    }

}