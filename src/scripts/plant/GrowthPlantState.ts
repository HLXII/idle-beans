import { App } from "@/App";
import FarmLocation from "../farm/FarmLocation";
import GrowthPlant from "./GrowthPlant";
import { PlantType } from "./PlantList";
import PlantState from "./PlantState";
import PlantStatus from "./PlantStatus";

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
        if (this.stageAge >= (this.data as GrowthPlant).growthTime) {
            App.game.features.log.log(`A ${this.type} has grown into a ${growth}.`);
            this.grow(growth);
        }
    }

    get growthPercent(): number {
        return this.stageAge / (this.data as GrowthPlant).growthTime;
    }

    get growthText(): string {
        return `Growing into ${(this.data as GrowthPlant).growthPlant(this)}`;
    }

    get statuses(): PlantStatus[] {
        const statuses = super.statuses;

        // Including growth status
        const growthStatus: PlantStatus = {
            percent: this.growthPercent,
            tooltip: this.growthText,
        }
        statuses.push(growthStatus);
        return statuses;
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
        oldStateData.stageAge = 0;
        newState.load(oldStateData);
        
        // Removing this plant
        App.game.features.farms.removePlantByState(this);

        // Adding new plant
        App.game.features.farms.addPlant(newState, newState.row, newState.col, newState.farm);

        // Unlocking plant
        newPlant.unlock();
    }

}