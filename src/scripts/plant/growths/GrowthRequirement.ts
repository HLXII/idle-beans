import Plot from "../../farm/Plot";
import GrowthPlantState from "../GrowthPlantState";
import { PlantType } from "../PlantList";
import PlantUnlock from '../../wiki/PlantUnlock';

export interface GrowthRequirementInterface {
    growthCheck: (plot: Plot, state: GrowthPlantState) => boolean;
    visible: () => boolean;
    description: string;
}

export default abstract class GrowthRequirement implements GrowthRequirementInterface {

    constructor(private _description?: string) { }

    /**
     * The growth check to run
     * @param plot The plot the plant is on
     * @param state The current state of the plant
     */
    public abstract growthCheck(plot: Plot, state: GrowthPlantState): boolean;

    public abstract visible(): boolean;

    get description(): string {
        return this._description ?? '';
    }

}