import { Features } from "@/Features";
import { BeanAmount } from "../bean/BeanList";
import Beans from "../bean/Beans";
import { GameText } from "../controls/GameText";
import GameHelper from "../GameHelper";
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

    abstract reward: BeanAmount;

    abstract label: string;

    abstract percent: number;

    abstract text: string;

    get rewardText(): GameText[] {
        const message = [];
        message.push('Prestige for:<br>');
        message.push(...GameHelper.beanAmount(this.reward));
        return message;
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
        this.beans.gainAmount(this.reward);

        // Cleanup game state for prestige
        this.prestiges.triggerPrestige();
    }

}