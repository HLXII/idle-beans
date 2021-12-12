import { GameText } from "../controls/GameText";
import LegumaPlantState from "./LegumaPlantState";
import Plant from "./Plant";

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
        const leguma = this.baseLegumaProduce;

        // TODO: Handle Upgrades

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