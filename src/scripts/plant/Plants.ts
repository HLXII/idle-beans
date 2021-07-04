
import { Features } from '@/Features';
import { SaveData, IgtFeature, AbstractField } from 'incremental-game-template';
import Beans from '../bean/Beans';
import Plant, { PlantSaveData } from './Plant';
import { PlantCategory, PlantList, PlantType } from './PlantList';
import AbstractUpgrade from './upgrades/AbstractUpgrade';
import { PlantUpgradeId, PlantUpgrades } from './upgrades/PlantUpgrades';

export interface PlantsSaveData extends SaveData {
    [key: string]: PlantSaveData;
}

export default class Plants extends IgtFeature {

    private beans!: Beans;

    public list: Record<PlantType, Plant> = PlantList;

    public upgrades: Record<PlantUpgradeId, AbstractUpgrade> = PlantUpgrades;

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
        if (!plant.upgrades.includes(upgradeId)) {
            console.error(`Error - Plant ${plant.name} doesn't contain Plant Upgrade ${upgradeId}.`);
            return;
        }
        if (plant.purchasedUpgrades.includes(upgradeId)) {
            console.error(`Error - Plant ${plant.name} already has Plant Upgrade ${upgradeId} purchased.`)
            return;
        }
        if (!this.beans.canAfford(upgrade.cost(plant.level))) {
            console.error(`Error - Cannot afford Plant Upgrade ${upgradeId} on Plant ${plant.name}.`);
            return;
        }

        this.beans.takeAmount(upgrade.cost(plant.level));
        plant.purchasedUpgrades.push(upgradeId);
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