
import { Features } from '@/Features';
import { SaveData, IgtFeature, AbstractField } from 'incremental-game-template';
import Beans from '../bean/Beans';
import Plant, { PlantSaveData } from './Plant';
import { PlantList, PlantType } from './PlantList';

export interface PlantsSaveData extends SaveData {
    [key: string]: PlantSaveData;
}

export default class Plants extends IgtFeature {

    private beans!: Beans;

    public list: Record<PlantType, Plant> = PlantList;

    constructor() {
        super('plants');
    }

    getDeveloperPanelFields(): AbstractField[] {
        // TODO:
        return [];
    }
    initialize(features: Features) {
        this.beans = features.beans;
    }
    canAccess(): boolean {
        return true;
    }

    /**
     * Helper function to obtain Plants via some filter
     * @param filter The filter function
     * @returns A list of Plants
     */
    filter(filter: (plant: Plant) => boolean): Plant[] {
        return Object.values(this.list).filter(filter);
    }

    saveKey = 'plants';
    save(): PlantsSaveData {
        const data: PlantsSaveData = {};
        Object.values(this.list).map((plant) => {
            data[plant.name] = plant.save();
        });
        return data;
    }
    load(data: PlantsSaveData): void {
        Object.entries(data).map(([plantType, plantData]) => {
            const plant = this.list[plantType as PlantType];
            if (!plant) {
                console.error(`Error - Attempting to load invalid Plant = ${plantType}`);
                return;
            }
            plant.load(plantData);
        });
    }

}