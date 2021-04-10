import { App } from "@/App";
import FarmLocation from "../farm/FarmLocation";
import GrowthPlant from "./GrowthPlant";
import { PlantType } from "./PlantList";
import PlantState from "./PlantState";

export default class GrowthPlantState extends PlantState {
    
    public growthPlant: PlantType;

    constructor(name: PlantType, location?: FarmLocation) {
        super(name, location);

        this.growthPlant = 'Bean Plant';
    }   

    /**
     * Updates the plant every game tick
     * @param delta The time passed (ms)
     */
    update(delta: number) {
        super.update(delta);

        const growth = (this.data as GrowthPlant).growthPlant(this);
        this.growthPlant = growth;
        if (this.age >= (this.data as GrowthPlant).growthTime) {
            App.game.features.log.log(`A ${this.type} has grown into a ${growth}.`);
            this.grow(growth);
        }
    }

    get growthPercent(): number {
        return this.age / (this.data as GrowthPlant).growthTime;
    }

    /**
     * Grows the plant into a new plant type
     * @param plant The plant type
     */
    grow(plant: PlantType) {
        // Generating new state
        const newPlant = App.game.features.plants.list[plant];
        const newState = newPlant.state();
        const oldStateData = this.save();
        oldStateData.type = plant;
        newState.load(oldStateData);
        
        // Removing this plant
        App.game.features.farms.removePlantByState(this);

        // Adding new plant
        App.game.features.farms.addPlant(newState, newState.row, newState.col, newState.farm);

        // Unlocking plant
        newPlant.unlock();
    }

}