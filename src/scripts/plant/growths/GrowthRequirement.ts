import GrowthPlantState from "../GrowthPlantState";

export interface GrowthRequirementInterface {
    growthCheck: (state: GrowthPlantState) => boolean;
    visible: () => boolean;
    description: string;
}

export default abstract class GrowthRequirement implements GrowthRequirementInterface {

    constructor(private _description?: string) { }

    /**
     * The growth check to run
     * @param state The current state of the plant
     */
    public abstract growthCheck(state: GrowthPlantState): boolean;

    public abstract visible(): boolean;

    get description(): string {
        return this._description ?? '';
    }

}