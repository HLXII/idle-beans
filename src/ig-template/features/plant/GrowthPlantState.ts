import { App } from "@/App";
import Plot from "../farm/Plot";
import GrowthPlant from "./GrowthPlant";
import { PlantType } from "./PlantList";
import PlantState from "./PlantState";

export default class GrowthPlantState extends PlantState {
    
    public growthPlant: PlantType;

    constructor(name: PlantType) {
        super(name);

        this.growthPlant = 'Bean Plant';
    }   

    /**
     * Updates the plant every game tick
     * @param delta The time passed (ms)
     */
    update(delta: number, plot: Plot) {
        super.update(delta, plot);

        const growth = (this.data as GrowthPlant).growthPlant(plot, this);
        this.growthPlant = growth;
        console.log(this.stageAge);
        if (this.stageAge >= (this.data as GrowthPlant).growthTime) {
            //App.game.features.log.log(`A ${this.plant} has grown into a ${growth}.`);
            this.grow(plot, growth);
        }
    }

}