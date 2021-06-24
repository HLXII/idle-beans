import { App } from "@/App";
import { GameText } from "@/scripts/controls/GameText";
import Plot from "../../../farm/Plot";
import PlotRequirement from "./PlotRequirement";

export function getOrthoPlots(plot: Plot): Plot[] {

    const farms = App.game.features.farms;

    const farm = plot.farm;
    const row = plot.row;
    const col = plot.col;

    const plotIndices = [[row - 1, col], [row, col - 1], [row, col + 1], [row + 1, col]];
    
    return plotIndices.filter(([r, c]) => farms.getFarm(farm).isValidCoord(r, c))
        .map(([r, c]) => farms.getPlot(r, c, farm));
}

export default class OrthoPlotsRequirement extends PlotRequirement {

    getPlots(plot: Plot): Plot[] {
        return getOrthoPlots(plot);
    }

    get description(): GameText[] {
        return ['The plant has nearby orthogonal plots'];
    }

    plotConditions(plots: Plot[]): boolean {
        throw new Error("Abstract method called.");
    }
    public visible(): boolean {
        throw new Error("Abstract method called.");
    }

}

