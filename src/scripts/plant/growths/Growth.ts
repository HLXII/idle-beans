import PlantUnlock from "../../wiki/PlantUnlock";
import Plant from "../Plant";
import { PlantType } from "../PlantList";
import { GrowthRequirementInterface } from "./GrowthRequirement";

export default class Growth implements PlantUnlock {
    
    constructor(public plant: PlantType, public req: GrowthRequirementInterface) { }

    get visible(): boolean {
        return this.req.visible();
    }

    get description(): string {
        return this.req.description;
    }
    
}