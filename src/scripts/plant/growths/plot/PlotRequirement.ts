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

    public growthCheck(state: GrowthPlantState): boolean {
        const plot = state.plot;
        const plots = this.getPlots(plot);
        return this.plotConditions(plots);
    }

    /**
     * Checks whether the given plots contain all the plant types given.
     * @param plots The plots to check
     * @param plant The plant types to check for. Can be singular or a list.
     */
     public static containsPlant(plots: Plot[], plantType: PlantType | PlantType[]): boolean {
        // Collapsing plant parameter
        if (!Array.isArray(plantType)) {
            plantType = [plantType];
        }
        return plantType.every((plantType) => {
            return plots.some((plot: Plot) => {
                const plant = plot.plant;
                return (plant !== undefined) && (plant.type == plantType);
            });
        });
    }

    /**
     * Checks whether the given plots contain at least the amount of plant types given
     * @param plots The plots to check
     * @param plant The plants, and the minimum amount required.
     */
    public static containsAtLeast(plots: Plot[], plant: { plant: PlantType; amount: number } | { plant: PlantType; amount: number }[]): boolean {
        // Collapsing plant parameter
        if (!Array.isArray(plant)) {
            plant = [plant];
        }

        // Counting plots
        const availablePlants: any = {};
        plots.forEach((plot) => {
            if (!plot.plant) {
                return;
            }
            if (!availablePlants[plot.plant.type]) {
                availablePlants[plot.plant.type] = 1;
            } else {
                availablePlants[plot.plant.type] += 1;
            }
        });

        // Checking requirement
        return plant.every((plant) => {
            return availablePlants[plant.plant] >= plant.amount;
        });
    }
    
}

export type MinimalPlot = ConstructorImplementing<PlotRequirement, 'getPlots'>;