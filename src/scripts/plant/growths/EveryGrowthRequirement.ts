import GrowthPlantState from "../GrowthPlantState";
import GrowthRequirement from "./GrowthRequirement";

export default class EveryGrowthRequirement extends GrowthRequirement {

    constructor(public reqs: GrowthRequirement[], _description?: string) {
        super(_description);
    }

    public growthCheck(state: GrowthPlantState): boolean {
        return this.reqs.every((req) => req.growthCheck(state));
    }

    public visible(): boolean {
        return this.reqs.every((req) => req.visible());
    }

    get description(): string {
        // TODO: Check if this formatting works well (might need 'and'?)
        return this.reqs.filter((req) => req.visible()).map((req) => req.description).join('<br>AND<br>');
    }

}