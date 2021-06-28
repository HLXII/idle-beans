import { App } from "@/App";
import { LinkType } from "../controls/GameText";
import FarmLocation from "../farm/FarmLocation";
import GrowthPlant from "./GrowthPlant";
import { PlantType } from "./PlantList";
import PlantState, { PlantStateSaveData } from "./PlantState";
import PlantStatus from "./PlantStatus";

export interface GrowthPlantStateSaveData extends PlantStateSaveData {
    stageAge: number;
}

export default class GrowthPlantState extends PlantState {
    
    /**
     * The Plant that this Plant will grow into
     */
    public growthPlant: PlantType;

    /**
     * The current age of this stage of plant
     */
    public stageAge: number;

    constructor(name: PlantType, location?: FarmLocation) {
        super(name, location);

        this.growthPlant = 'Bean Plant';
        this.stageAge = 0;
    }   

    /**
     * Updates the plant every game tick
     * @param delta The time passed (ms)
     */
    update(delta: number) {
        super.update(delta);

        this.stageAge += delta;

        const growth = this.data.growthPlant(this);
        this.growthPlant = growth;
        if (this.stageAge >= this.data.growthTime(this)) {
            App.game.features.log.log([
                'A ',
                {text: this.type, type: LinkType.Plant, id: this.type},
                ' has grown into a ',
                {text: growth, type: LinkType.Plant, id: growth},
            ]);
            this.grow(growth);
        }
    }

    get growthPercent(): number {
        return this.stageAge / this.data.growthTime(this);
    }

    get growthText(): string {
        return `Growing into ${this.data.growthPlant(this)}`;
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
    
    get data(): GrowthPlant {
        return super.data as GrowthPlant;
    }

    save(): GrowthPlantStateSaveData {
        return {
            ...super.save(),
            stageAge: this.stageAge,
        };
    }
    load(data: GrowthPlantStateSaveData): void {
        super.load(data);
        this.stageAge = data.stageAge ?? 0;
    }
}