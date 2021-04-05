import { App } from "@/App";
import Plot from "../../../farm/Plot";
import PlotRequirement from "./PlotRequirement";

export default abstract class NearPlotsRequirement extends PlotRequirement {

    getPlots(plot: Plot): Plot[] {
        return App.game.features.farm.nearPlots(plot);
    }

    get description(): string {
        return 'The plant has nearby plots';
    }

}