import { App } from "@/App";
import Plot from "@/ig-template/features/farm/Plot";
import GameHelper from "@/ig-template/util/GameHelper";
import { PlantType } from "../../PlantList";
import DiagPlotsRequirement from "./DiagPlotsRequirement";

export default class DiagContainsRequirement extends DiagPlotsRequirement {

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
        return App.game.features.farm.containsAtLeast(plots, this.data);
    }

    public visible(): boolean {
        return this.data.some((datum) => App.game.features.plants.list[datum.plant].globalUnlocked);
    }
 
    get description(): string {
        const data = this.data.map((datum) => `${datum.amount} ${datum.plant}${datum.amount > 1 ? 's' : ''}`);
        return `${super.description} that contain at least ${GameHelper.listString(data, 'and')}`;
    }

}