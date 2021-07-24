import { App } from "@/App";
import { SaveData, Saveable } from "incremental-game-template";
import EntityState from "../entity/EntityState";
import Status from "../entity/Status";
import { getAllOrthoPlots, getOrthoPlots } from "../plant/growths/plot/OrthoPlotsRequirement";
import { PlotUpdateCycle } from "./AbstractFarm";
import FarmLocation from "./FarmLocation";
import { FarmType } from "./FarmType";

export interface PlotSaveData extends SaveData, FarmLocation {
    leguma: number;
}

export default class Plot implements Saveable, FarmLocation {

    public farm: FarmType;
    public row: number;
    public col: number;

    public leguma: number;

    private _sentLeguma: number[] = [];

    constructor(farm: FarmType, row: number, col: number) {
        this.farm = farm;
        this.row = row;
        this.col = col;

        this.leguma = 0;
    }

    public manaProp = 0.02;

    /**
     * Update the Plot
     * @param delta Time elased (s)
     * @param cycle The PlotUpdateCycle number
     */
    update(delta: number, cycle: number) {
        switch(cycle) {
            case PlotUpdateCycle.Base: {
                break;
            }
            case PlotUpdateCycle.ManaPropagationSend: {
                const orthoPlots = getAllOrthoPlots(this);
                this._sentLeguma = orthoPlots.map((plot) => {
                    if (plot) {
                        if (plot.leguma < this.leguma) {
                            return delta * this.manaProp * (this.leguma - plot.leguma);
                        } else {
                            return 0;
                        }
                    } else {
                        return delta * this.manaProp * this.leguma;
                    }
                });
                break;
            } 
            case PlotUpdateCycle.ManaPropagationGroup: {
                // Send out Leguma
                const orthoPlots = getAllOrthoPlots(this);
                orthoPlots.forEach((plot, idx) => {
                    if (plot) {
                        plot.leguma += this._sentLeguma[idx];        
                    }
                });
                this.leguma -= this._sentLeguma.reduce((a, b) => a + b, 0);
                this._sentLeguma = [];
                break;
            }
            case PlotUpdateCycle.ManaPropagationProcess: {
                // Fixing
                const maxLeguma = App.game.features.farms.getFarm(this.farm).maxLeguma;
                this.leguma = Math.min(maxLeguma, Math.max(0, this.leguma));

                // Handling Leguma Overload
                // TODO:
            }
        }
    }

    /**
     * Statuses that are affecting the Plot
     */
    get statuses(): Status[] {
        const statuses = [];

        // Leguma
        if (this.leguma > 0) {
            const maxLeguma = App.game.features.farms.getFarm(this.farm).maxLeguma;
            const legumaPercent = this.leguma / maxLeguma;
            const legumaStatus = new Status('Leguma', legumaPercent, `${this.leguma}/${maxLeguma}`, 'blue');
            statuses.push(legumaStatus);
        }

        return statuses;
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
            leguma: this.leguma,
        };
    }
    load(data: PlotSaveData): void {
        this.farm = data?.farm ?? FarmType.plains;
        this.row = data?.row ?? 0;
        this.col = data?.col ?? 0;
        this.leguma = data?.leguma ?? 0;
    }

}