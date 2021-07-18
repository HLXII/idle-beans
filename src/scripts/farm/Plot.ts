import { App } from "@/App";
import { SaveData, Saveable } from "incremental-game-template";
import EntityState from "../entity/EntityState";
import Status from "../entity/Status";
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
     * Statuses that are affecting the Plot
     */
    get status(): Status[] {
        return [];
    }

    /**
     * Obtains a reference to the Entity on this Plot, if one exists
     */
    get entity(): EntityState | undefined {
        return App.game.features.farms.getEntity(this.row, this.col, this.farm);
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
        this.farm = data?.farm ?? FarmType.plains;
        this.row = data?.row ?? 0;
        this.col = data?.col ?? 0;
    }

}