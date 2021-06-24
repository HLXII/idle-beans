import { GameText } from "@/scripts/controls/GameText";
import GrowthPlantState from "../GrowthPlantState";
import GrowthRequirement from "./GrowthRequirement";

export default class EveryGrowthRequirement extends GrowthRequirement {

    constructor(public reqs: GrowthRequirement[], _description?: GameText[]) {
        super(_description);
    }

    public growthCheck(state: GrowthPlantState): boolean {
        return this.reqs.every((req) => req.growthCheck(state));
    }

    public visible(): boolean {
        return this.reqs.every((req) => req.visible());
    }

    get description(): GameText[] {
        // TODO: Check if this formatting works well (might need 'and'?)
        const description = [];
        const descs = this.reqs.filter((req) => req.visible()).map((req) => req.description);
        const firsts = descs.slice(0, descs.length - 1);
        const last = descs[descs.length - 1];
        for (const desc of descs) {
            description.push(...desc);
            description.push('<br>AND</br>');
        }
        description.push(...last);
        return description;
    }

}