import { App } from "@/App";
import { AbstractField } from "@/ig-template/developer-panel/fields/AbstractField";
import { Features } from "@/ig-template/Features";
import { Feature } from "@/ig-template/features/Feature";
import { SaveData } from "@/ig-template/tools/saving/SaveData";
import { BeanType } from "../bean/BeanList";
import { isPlantable } from "../bean/Plantable";
import PlantState from "../plant/PlantState";
import { FarmSaveData } from "./AbstractFarm";
import Farm from "./Farm";
import { FarmType } from "./FarmType";
import Plot from "./Plot";


export interface FarmsSaveData extends SaveData {
    farms: Record<FarmType, FarmSaveData>;
    activeFarm: FarmType;
}

export default class Farms extends Feature {

    public farms!: Record<FarmType, Farm>;

    public activeFarm!: FarmType;

    public readonly defaultPlotSize: number = 5;

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
        this.activeFarm = FarmType.farm;
    }
    start(): void {
        return;
    }
    stop(): void {
        return;
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
        if (farm === undefined) {
            farm = this.activeFarm;
        }

        return this.farms[farm];
    }

    getPlot(row: number, col: number, farm?: FarmType): Plot {
        // Obtaining Farm if not given
        if (farm === undefined) {
            farm = this.activeFarm;
        }

        return this.getFarm(farm).getPlot(row, col);
    }

    getPlant(row: number, col: number, farm?: FarmType): PlantState | undefined {
        // Obtaining Farm if not given
        if (farm === undefined) {
            farm = this.activeFarm;
        }

        return this.getFarm(farm).getPlant(row, col);
    }

    addPlant(state: PlantState, row: number, col: number, farm?: FarmType) {
        // Obtaining Farm if not given
        if (farm === undefined) {
            farm = this.activeFarm;
        }

        this.getFarm(farm).addPlant(state, row, col);
    }

    removePlant(row: number, col: number, farm?: FarmType) {
        // Obtaining Farm if not given
        if (farm === undefined) {
            farm = this.activeFarm;
        }

        // Handling plant removal
        const plant = this.getPlant(row, col ,farm);
        plant?.handleRemove();

        this.getFarm(farm).removePlant(row, col);
    }

    removePlantByState(state: PlantState) {
        this.getFarm(state.farm).removePlant(state.row, state.col);
    }

    plantBean(beanType: BeanType, row: number, col: number, farm?: FarmType) {
        // Sanity checks
        if (beanType === undefined) {
            return;
        }
        
        // Obtaining Farm if not given
        if (farm === undefined) {
            farm = this.activeFarm;
        }

        const bean = App.game.features.beans.list[beanType];
        // Check if can plant bean
        if (isPlantable(bean)) {
            bean.plant(farm, row, col);
        }
    }

    //#region Save
    load(data: FarmsSaveData): void {
        Object.entries(data.farms).forEach(([farmType, data]) => {
            this.farms[Number(farmType) as FarmType].load(data);
        }); 
        this.activeFarm = data.activeFarm ?? FarmType.farm;
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