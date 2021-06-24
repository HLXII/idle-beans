import { GameText } from "@/scripts/controls/GameText";
import PlantUnlock from "../../wiki/PlantUnlock";
import { PlantType } from "../PlantList";
import { GrowthRequirementInterface } from "./GrowthRequirement";

export default class Growth implements PlantUnlock {
    
    constructor(public plant: PlantType, public req: GrowthRequirementInterface) { }

    get visible(): boolean {
        return this.req.visible();
    }

    get description(): GameText[] {
        return this.req.description;
    }
    
}