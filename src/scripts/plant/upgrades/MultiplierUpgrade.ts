import ModifierUpgrade from "./ModifierUpgrade";
import { PlantEffectId } from "./PlantEffectId";

export default class MultiplierUpgrade extends ModifierUpgrade {

    constructor(name: string, description: string, baseCost: number, effect: PlantEffectId, public multiplier: number) {
        super(name, description, baseCost, effect);
    }

    modifier(initialValue: number): number {
        return initialValue * this.multiplier;
    }

}