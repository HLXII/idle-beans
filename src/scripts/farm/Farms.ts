import { App } from "@/App";
import { Features } from "@/Features";
import { SaveData, IgtFeature, AbstractField } from "incremental-game-template";
import { BeanType } from "../bean/BeanList";
import { isPlantable } from "../bean/plantable/Plantable";
import EntityState from "../entity/EntityState";
import PlantState from "../plant/PlantState";
import ProducePlantState from "../plant/ProducePlantState";
import AbstractFarm, { FarmSaveData } from "./AbstractFarm";
import Farm from "./Farm";
import { FarmType } from "./FarmType";
import Plot from "./Plot";


export interface FarmsSaveData extends SaveData {
    farms: Record<FarmType, FarmSaveData>;
    activeFarm: FarmType;
}

export default class Farms extends IgtFeature {

    public farms!: Record<FarmType, AbstractFarm>;

    public activeFarm!: FarmType;

    constructor() {
        super('farms');
    }

    getDeveloperPanelFields(): AbstractField[] {
        // TODO
        return [];
    }
    initialize(features: Features): void {
        this.farms = [
            new Farm(),
        ];
        this.activeFarm = FarmType.plains;
    }
    canAccess(): boolean {
        return true;
    }

    update(delta: number) {
        // Updating farms
        Object.values(this.farms).forEach((farm) => {
            farm.update(delta);
        });
    }

    getFarm(farm?: FarmType): Farm {
        // Obtaining Farm if not given
        farm = farm ?? this.activeFarm;

        return this.farms[farm];
    }

    getPlot(row: number, col: number, farm?: FarmType): Plot {
        // Obtaining Farm if not given
        farm = farm ?? this.activeFarm;

        return this.getFarm(farm).getPlot(row, col);
    }

    getEntity(row: number, col: number, farm?: FarmType): EntityState {
        // Obtaining Farm if not given
        farm = farm ?? this.activeFarm;

        return this.getFarm(farm).getEntity(row, col);
    }

    addEntity(state: EntityState, row: number, col: number, farm?: FarmType) {
        // Obtaining Farm if not given
        farm = farm ?? this.activeFarm;

        this.getFarm(farm).addEntity(state, row, col);
    }

    removeEntity(row: number, col: number, farm?: FarmType) {
        // Obtaining Farm if not given
        farm = farm ?? this.activeFarm;

        // Handling Plant removal
        const entity = this.getEntity(row, col ,farm);
        if (entity instanceof PlantState) {
            entity.handleRemove();
        }
    
        this.getFarm(farm).removeEntity(row, col);
    }

    removeEntityByState(state: EntityState) {
        this.getFarm(state.farm).removeEntity(state.row, state.col);
    }

    harvestPlant(row: number, col: number, farm?: FarmType) {
        // Obtaining Farm if not given
        farm = farm ?? this.activeFarm;

        // Checking if this is a harvestable plant
        const plant = this.getEntity(row, col ,farm);
        if (plant instanceof ProducePlantState) {
            plant.harvest();
            return true;
        } else {
            return false;
        }
    }

    plantBean(beanType: BeanType, row: number, col: number, farm?: FarmType) {
        // Sanity checks
        if (beanType === undefined) {
            return;
        }
        
        // Obtaining Farm if not given
        farm = farm ?? this.activeFarm;

        const bean = App.game.features.beans.list[beanType];
        // Check if can plant bean
        if (isPlantable(bean)) {
            bean.plant(farm, row, col);
        }
    }

    get availableFarms(): AbstractFarm[] {
        return Object.values(this.farms).filter(farm => farm.canAccess());
    }

    get hasMultipleFarms(): boolean {
        return this.availableFarms.length > 1;
    }

    //#region Save
    load(data: FarmsSaveData): void {
        Object.entries(data.farms).forEach(([farmType, data]) => {
            this.farms[Number(farmType) as FarmType].load(data);
        }); 
        this.activeFarm = data.activeFarm ?? FarmType.plains;
    }
    save(): FarmsSaveData {
        const farms: {[key in FarmType]?: FarmSaveData} = {};
        Object.entries(this.farms).forEach(([farmType, farm]) => {
            farms[Number(farmType) as FarmType] = farm.save();
        });

        const data: FarmsSaveData = {
            farms: farms as Record<FarmType, FarmSaveData>,
            activeFarm: this.activeFarm,
        };
        return data;
    }
    //#endregion

}