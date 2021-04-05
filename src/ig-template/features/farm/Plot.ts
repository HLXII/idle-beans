import { App } from "@/App";
import { Saveable } from "@/ig-template/tools/saving/Saveable";
import { SaveData } from "@/ig-template/tools/saving/SaveData";
import { PlantType } from "../plant/PlantList";
import PlantState, { PlantStateSaveData } from "../plant/PlantState";

export interface PlotSaveData extends SaveData {
    plant?: PlantStateSaveData;
}

export default class Plot implements Saveable {

    public plant?: PlantState;

    constructor(public row: number, public col: number) {

    }

    update(delta: number) {
        // Update plant
        if (this.plant) {
            this.plant.update(delta, this);
        }

        // Update dirt?
    }

    /**
     * Handles removing the plant
     */
    removePlant() {
        // No plant to remove
        if (!this.plant) {
            return;
        }

        // Handle plant removal
        this.plant.handleRemove(this);
        this.plant = undefined;
    }

    // TODO: Not sure if save key is necessary
    saveKey = '';
    save(): PlotSaveData {
        return {
            plant: this.plant?.save(),
        }
    }
    load(data: PlotSaveData): void {
        if (data.plant) {
            const plantState = App.game.features.plants.list[data.plant.plant as PlantType].state();
            plantState.load(data.plant);
            this.plant = plantState;
        }
    }

}