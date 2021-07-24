import { App } from "@/App";
import { GameText } from "../controls/GameText";
import LegumaPlantState from "./LegumaPlantState";
import Plant from "./Plant";
import ModifierUpgrade from "./upgrades/ModifierUpgrade";
import { PlantEffectId } from "./upgrades/PlantEffectId";

export default abstract class LegumaPlant extends Plant {
    public static state = LegumaPlantState;

    /**
     * Base Leguma produced per second
     */
    public abstract baseLegumaProduce: number;

    /**
     * Leguma produced per second
     * If the LegumaPlantState is given, will also take into account status effects
     * @param state The LegumaPlantState
     * @returns Leguma produced per second
     */
    legumaProduce(state?: LegumaPlantState): number {
        let leguma = this.baseLegumaProduce;

        // Handle Upgrades
        this.upgrades.filter((upgradeState) => upgradeState.purchased).map((upgradeState) => {
            return App.game.features.plants.upgrades[upgradeState.id];
        }).forEach((upgrade) => {
            if (upgrade instanceof ModifierUpgrade) {
                leguma = upgrade.applyEffect(leguma, PlantEffectId.GrowthTime);
            }
        });

        // Handle Statuses
        // TODO:

        return leguma;
    }

    get description(): GameText[] {
        return [
            ...this.baseDescription,
            '<br>',
            `Produces ${this.legumaProduce()} Leguma per second.`, 
        ];
    }

}