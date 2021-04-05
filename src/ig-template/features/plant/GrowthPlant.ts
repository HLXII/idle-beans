import Plot from '../farm/Plot';
import GrowthPlantState from './GrowthPlantState';
import Plant from './Plant';
import { PlantType } from './PlantList';
import Growth from './growths/Growth';

export interface GrowthCheck {
    plant: PlantType;
    time: number;
}

export default abstract class GrowthPlant extends Plant {
    public static state = GrowthPlantState;

    /**
     * Age (ms) in which the plant will grow
     */
    public abstract growthTime: number;
    /**
     * List of possible growth requirements.
     * Will be check in order of appearance (first requirement prioritized)
     * Last requirement must be the default growth, and always return true
     */
    public abstract growths: Growth[];

    constructor(name: string) {
        super(name);
    }

    /**
     * Handles checking growth requirements
     * @param plot The plot
     * @param state The current plant state
     */
    growthPlant(plot: Plot, state: GrowthPlantState): PlantType {
        for (const growth of this.growths) {
            if (growth.req.growthCheck(plot, state)) {
                return growth.plant;
            }
        }

        // Sanity check. Growth requirements should always return a value
        console.error('Error - Could not find growth requirement', plot, state);
        return 'Bean Bud';
    }

}