
import { Features } from '@/Features';
import { SaveData, IgtFeature, AbstractField } from 'incremental-game-template';
import Plant, { PlantSaveData } from './Plant';
import { PlantList, PlantType } from './PlantList';

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