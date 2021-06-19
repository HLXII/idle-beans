import { App } from "@/App";
import { SaveData, Saveable } from "incremental-game-template";
import PlantState from "../plant/PlantState";
import FarmLocation from "./FarmLocation";
import { FarmType } from "./FarmType";

export interface PlotSaveData extends SaveData, FarmLocation {

}

export default class Plot implements Saveable, FarmLocation {

    public farm: FarmType;
    public row: number;
    public col: number;

    constructor(farm: FarmType, row: number, col: number) {
        this.farm = farm;
        this.row = row;
        this.col = col;
    }

    update(delta: number) {
        return;
    }

    /**
     * Obtains a reference to the Plant on this Plot, if one exists
     */
    get plant(): PlantState | undefined {
        return App.game.features.farms.getPlant(this.row, this.col, this.farm);
    }

    saveKey = '';
    save(): PlotSaveData {
        return {
            farm: this.farm,
            row: this.row,
            col: this.col,
        };
    }
    load(data: PlotSaveData): void {
        this.farm = data?.farm ?? FarmType.farm;
        this.row = data?.row ?? 0;
        this.col = data?.col ?? 0;
    }

}