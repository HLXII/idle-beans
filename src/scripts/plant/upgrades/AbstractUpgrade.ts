import { BeanAmount, BeanType } from "@/scripts/bean/BeanList";
import { GameText } from "@/scripts/controls/GameText";

export default abstract class AbstractUpgrade {
    
    public description: GameText[];

    constructor(public name: string, description: GameText | GameText[], public baseCost: BeanAmount) {
        if (Array.isArray(description)) {
            this.description = description;
        } else {
            this.description = [description];
        }
    }

    cost(level: number) {
        const cost: BeanAmount = {};
        Object.entries(this.baseCost).forEach(([bean, amount]) => {
            cost[bean as BeanType] = (amount ?? 0) * level;
        });
        return cost;
    }

}