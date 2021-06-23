import { App } from "@/App";
import Plot from "../../../farm/Plot";
import PlotRequirement from "./PlotRequirement";

export function getDiagPlots(plot: Plot): Plot[] {

    const farms = App.game.features.farms;

    const farm = plot.farm;
    const row = plot.row;
    const col = plot.col;

    const plotIndices = [[row - 1, col - 1], [row - 1, col + 1], [row + 1, col - 1], [row + 1, col + 1]];
    
    return plotIndices.filter(([r, c]) => farms.getFarm(farm).isValidCoord(r, c))
        .map(([r, c]) => farms.getPlot(r, c, farm));
}

export default class DiagPlotsRequirement extends PlotRequirement {

    getPlots(plot: Plot): Plot[] {
        return getDiagPlots(plot);
    }

    get description(): string {
        return 'The plant has nearby diagonal plots';
    }

    plotConditions(plots: Plot[]): boolean {
        throw new Error("Abstract method called.");
    }
    public visible(): boolean {
        throw new Error("Abstract method called.");
    }

}