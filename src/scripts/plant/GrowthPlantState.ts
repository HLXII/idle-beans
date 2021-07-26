import { App } from "@/App";
import { WikiType } from "../wiki/Wiki";
import FarmLocation from "../farm/FarmLocation";
import { EntryType } from "../log/Log";
import GrowthPlant from "./GrowthPlant";
import { PlantType } from "./PlantList";
import PlantState, { PlantStateSaveData } from "./PlantState";
import Status from "../entity/Status";

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

    update(delta: number) {
        super.update(delta);

        this.stageAge += delta;

        const growth = this.data.growthPlant(this);
        this.growthPlant = growth;
        if (this.stageAge >= this.data.growthTime(this)) {
            App.game.features.log.log([
                'A ',
                {text: this.type, type: WikiType.Plant, id: this.type},
                ' has grown into a ',
                {text: growth, type: WikiType.Plant, id: growth},
            ], EntryType.Growth);
            this.grow(growth);
        }
    }

    //#region Growth Status
    get growthPercent(): number {
        return this.stageAge / this.data.growthTime(this);
    }

    get growthText(): string {
        return `Growing into ${this.data.growthPlant(this)}`;
    }
    //#endregion

    get statuses(): Status[] {
        const statuses = super.statuses;

        // Including growth status
        const growthStatus = new Status('Growth', this.growthPercent, this.growthText, 'green');
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
        App.game.features.farms.removeEntityByState(this);

        // Adding new plant
        App.game.features.farms.addEntity(newState, newState.row, newState.col, newState.farm);

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