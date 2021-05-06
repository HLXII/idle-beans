import { App } from "@/App";
import Plot from "../../../farm/Plot";
import PlotRequirement from "./PlotRequirement";

export default class NearPlotsRequirement extends PlotRequirement {

    getPlots(plot: Plot): Plot[] {

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

    get description(): string {
        return 'The plant has nearby plots';
    }

    plotConditions(plots: Plot[]): boolean {
        throw new Error("Abstract method called.");
    }
    public visible(): boolean {
        throw new Error("Abstract method called.");
    }

}