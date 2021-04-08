import GrowthPlantState from "../GrowthPlantState";
import GrowthRequirement from "./GrowthRequirement";

export default class DefaultRequirement extends GrowthRequirement {

    public growthCheck(state: GrowthPlantState): boolean {
        return true;
    }

    public visible(): boolean {
        return true;
    }

    get description(): string {
        return 'The plant will grow into this plant by default.';
    }

}