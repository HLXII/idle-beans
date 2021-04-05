import Plot from "../../../farm/Plot";
import GrowthPlantState from "../../GrowthPlantState";
import { PlantType } from "../../PlantList";
import GrowthRequirement from "../GrowthRequirement";

export default abstract class PlotRequirement extends GrowthRequirement {

    /**
     * Retrieves the plots to run checks on
     * @param plot The plot the current plant is on
     */
    abstract getPlots(plot: Plot): Plot[];

    /**
     * The conditions for the requirement
     * @param plots The plots to check
     */
    abstract plotConditions(plots: Plot[]): boolean;

    public growthCheck(plot: Plot, state: GrowthPlantState): boolean {
        const plots = this.getPlots(plot);
        return this.plotConditions(plots);
    }
    
}