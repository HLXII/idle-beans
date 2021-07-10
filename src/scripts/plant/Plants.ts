
import { Features } from '@/Features';
import { SaveData, IgtFeature, AbstractField } from 'incremental-game-template';
import Beans from '../bean/Beans';
import Plant, { PlantSaveData } from './Plant';
import { PlantList, PlantType } from './PlantList';
import PlantUpgrade from './upgrades/PlantUpgrade';
import { PlantUpgradeId, PlantUpgrades } from './upgrades/PlantUpgrades';

export interface PlantsSaveData extends SaveData {
    [key: string]: PlantSaveData;
}

export default class Plants extends IgtFeature {

    private beans!: Beans;

    public list: Record<PlantType, Plant> = PlantList;

    public upgrades: Record<PlantUpgradeId, PlantUpgrade> = PlantUpgrades;

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

    purchaseUpgrade(plant: Plant, upgradeId: PlantUpgradeId) {
        const upgrade = this.upgrades[upgradeId];
        if (!plant || !upgrade) {
            console.error(`Error - Invalid Plant (${plant}) or Plant Upgrade (${upgradeId})`)
            return;
        }
        const upgradeState = plant.upgrades.find((upgradeState) => upgradeState.id === upgradeId);
        if (!upgradeState) {
            console.error(`Error - Plant ${plant.name} doesn't contain Plant Upgrade ${upgradeId}.`);
            return;
        }
        if (!upgradeState.visible(plant)) {
            console.error(`Error - Plant Upgrade ${upgradeId} is not purchaseable yet.`);
            return;
        }
        if (upgradeState.purchased) {
            console.error(`Error - Plant ${plant.name} already has Plant Upgrade ${upgradeId} purchased.`)
            return;
        }
        if (!this.beans.canAfford(upgradeState.cost)) {
            console.error(`Error - Cannot afford Plant Upgrade ${upgradeId} on Plant ${plant.name}.`);
            return;
        }

        this.beans.takeAmount(upgradeState.cost);
        upgradeState.purchased = true;
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