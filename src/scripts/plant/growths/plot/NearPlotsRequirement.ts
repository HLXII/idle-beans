import { App } from "@/App";
import { GameText } from "@/scripts/controls/GameText";
import Plot from "../../../farm/Plot";
import PlotRequirement from "./PlotRequirement";

export function getNearPlots(plot: Plot): Plot[] {

    const farms = App.game.features.farms;

    const farm = plot.farm;
    const row = plot.row;
    const col = plot.col;

    const plots = [];
    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (!farms.getFarm(farm).isValidCoord(r, c)) {
                continue;
            }
            if (r === row && c === col) {
                continue;
            }

            plots.push(farms.getPlot(r, c, farm));
        }
    }

    return plots;
}

export default class NearPlotsRequirement extends PlotRequirement {

    getPlots(plot: Plot): Plot[] {
        return getNearPlots(plot);
    }

    get description(): GameText[] {
        return ['The plant has nearby plots'];
    }

    plotConditions(plots: Plot[]): boolean {
        throw new Error("Abstract method called.");
    }
    public visible(): boolean {
        throw new Error("Abstract method called.");
    }

}