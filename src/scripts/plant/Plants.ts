
import { SaveData, IgtFeature, AbstractField } from 'incremental-game-template';
import Plant, { PlantSaveData } from './Plant';
import { PlantCategory, PlantList, PlantType } from './PlantList';

export interface PlantsSaveData extends SaveData {
    [key: string]: PlantSaveData;
}

export default class Plants extends IgtFeature {

    public list: Record<PlantType, Plant> = PlantList;

    constructor() {
        super('plants');
    }

    getDeveloperPanelFields(): AbstractField[] {
        // TODO:
        return [];
    }
    canAccess(): boolean {
        return true;
    }

    catIsVisible(category: PlantCategory) {
        return Object.values(this.list).filter((plant) => {
            if (plant.category !== category) {
                return false;
            }
            return plant.unlocked;
        }).length > 0;
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