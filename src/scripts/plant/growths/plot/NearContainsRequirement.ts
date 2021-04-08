import { App } from "@/App";
import Plot from "@/scripts/farm/Plot";
import GameHelper from "@/scripts/GameHelper";
import { PlantType } from "../../PlantList";
import NearPlotsRequirement from "./NearPlotsRequirement";
import PlotRequirement from "./PlotRequirement";

export default class NearContainsRequirement extends NearPlotsRequirement {

    public data: {plant: PlantType; amount: number}[]; 

    constructor(data: PlantType | {plant: PlantType; amount: number} | ({plant: PlantType; amount: number} | PlantType)[]) {
        super();

        // Collapsing data parameter
        if (!Array.isArray(data)) {
            data = [data];
        }
        // Defaulting amount
        this.data = data.map((datum) => {
            if (typeof datum === 'string') {
                return {plant: datum, amount: 1};
            } else {
                return datum;
            }
        });
    }

    plotConditions(plots: Plot[]): boolean {
        return PlotRequirement.containsAtLeast(plots, this.data);
    }

    public visible(): boolean {
        return this.data.some((datum) => App.game.features.plants.list[datum.plant].globalUnlocked);
    }
 
    get description(): string {
        const data = this.data.map((datum) => `${datum.amount} ${datum.plant}${datum.amount > 1 ? 's' : ''}`);
        return `${super.description} that contain at least ${GameHelper.listString(data, 'and')}`;
    }

}