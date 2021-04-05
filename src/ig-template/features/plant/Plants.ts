
import { AbstractField } from '@/ig-template/developer-panel/fields/AbstractField';
import { Features } from '@/ig-template/Features';
import { SaveData } from '@/ig-template/tools/saving/SaveData';
import { Feature } from '../Feature';
import Plant, { PlantSaveData } from './Plant';
import { PlantList, PlantType } from './PlantList';

export interface PlantsSaveData extends SaveData {
    [key: string]: PlantSaveData;
}

export default class Plants implements Feature {

    public list: Record<PlantType, Plant> = PlantList;

    getDeveloperPanelFields(): AbstractField[] {
        // TODO:
        return [];
    }
    initialize(features: Features): void {
        return;
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
    update(delta: number): void {
        return;
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
            this.list[plantType as PlantType].load(plantData);
        });
    }

}