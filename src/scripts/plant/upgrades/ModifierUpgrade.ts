import { GameText } from "@/scripts/controls/GameText";
import PlantUpgrade from "./PlantUpgrade";
import { PlantEffectId } from "./PlantEffectId";
import { Requirement } from "incremental-game-template";

export default abstract class ModifierUpgrade extends PlantUpgrade {

    constructor(name: string, description: GameText | GameText[], public effect: PlantEffectId, prevUpgrade?: string, requirement?: Requirement) {
        super(name, description, prevUpgrade, requirement);
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