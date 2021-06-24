import { GameText } from "@/scripts/controls/GameText";
import GrowthPlantState from "../GrowthPlantState";

export interface GrowthRequirementInterface {
    growthCheck: (state: GrowthPlantState) => boolean;
    visible: () => boolean;
    description: GameText[];
}

export default abstract class GrowthRequirement implements GrowthRequirementInterface {

    constructor(private _description?: GameText[]) { }

    /**
     * The growth check to run
     * @param state The current state of the plant
     */
    public abstract growthCheck(state: GrowthPlantState): boolean;

    public abstract visible(): boolean;

    get description(): GameText[] {
        return this._description ?? [];
    }

}