import { BeanAmount, BeanType } from "@/scripts/bean/BeanList";

export default abstract class AbstractUpgrade {
    
    constructor(
        public name: string,
        public description: string,
        public baseCost: BeanAmount,
    ) { }

    cost(level: number) {
        const cost: BeanAmount = {};
        Object.entries(this.baseCost).forEach(([bean, amount]) => {
            cost[bean as BeanType] = (amount ?? 0) * level;
        });
        return cost;
    }

}