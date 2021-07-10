import { GameText } from "@/scripts/controls/GameText";
import { Requirement } from "incremental-game-template";
import ModifierUpgrade from "./ModifierUpgrade";
import { PlantEffectId } from "./PlantEffectId";

export default class MultiplierUpgrade extends ModifierUpgrade {

    constructor(name: string, description: GameText | GameText[], effect: PlantEffectId, public multiplier: number, prevUpgrade?: string, requirement?: Requirement) {
        super(name, description, effect, prevUpgrade, requirement);
    }

    modifier(initialValue: number): number {
        return initialValue * this.multiplier;
    }

}