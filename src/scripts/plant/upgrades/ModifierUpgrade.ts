import { BeanAmount } from "@/scripts/bean/BeanList";
import { GameText } from "@/scripts/controls/GameText";
import AbstractUpgrade from "./AbstractUpgrade";
import { PlantEffectId } from "./PlantEffectId";

export default abstract class ModifierUpgrade extends AbstractUpgrade {

    constructor(name: string, description: GameText | GameText[], baseCost: BeanAmount, public effect: PlantEffectId) {
        super(name, description, baseCost);
    }

    public applyEffect(initialValue: number, effect: PlantEffectId): number {
        if (effect !== this.effect) {
            return initialValue;
        } else {
            return this.modifier(initialValue);
        }
    }

    abstract modifier(initialValue: number): number;

}