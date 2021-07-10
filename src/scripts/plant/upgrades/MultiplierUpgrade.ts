import { GameText } from "@/scripts/controls/GameText";
import ModifierUpgrade from "./ModifierUpgrade";
import { PlantEffectId } from "./PlantEffectId";

export default class MultiplierUpgrade extends ModifierUpgrade {

    constructor(name: string, description: GameText | GameText[], effect: PlantEffectId, public multiplier: number) {
        super(name, description, effect);
    }

    modifier(initialValue: number): number {
        return initialValue * this.multiplier;
    }

}