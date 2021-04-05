import { App } from "@/App";
import Plot from "../../../farm/Plot";
import PlotRequirement from "./PlotRequirement";

export default abstract class OrthoPlotsRequirement extends PlotRequirement {

    getPlots(plot: Plot): Plot[] {
        return App.game.features.farm.orthoPlots(plot);
    }

    get description(): string {
        return 'The plant has nearby orthogonal plots';
    }

}