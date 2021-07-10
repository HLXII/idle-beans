import { App } from "@/App";
import { BeanAmount } from "@/scripts/bean/BeanList";
import { Saveable, SaveData } from "incremental-game-template";
import Plant from "../Plant";
import PlantUpgrade from "./PlantUpgrade";
import { PlantUpgradeId } from "./PlantUpgrades";

export interface UpgradeStateSaveData extends SaveData {
    purchased: boolean;
}

export default class UpgradeState implements Saveable {

    public purchased: boolean;

    constructor(public id: PlantUpgradeId, public cost: BeanAmount) {   
        this.purchased = false;
    }

    get data(): PlantUpgrade {
        return App.game.features.plants.upgrades[this.id as PlantUpgradeId];
    }

    visible(plant: Plant) {
        const upgrade = this.data;
        if (upgrade.prevUpgrade && !plant.purchasedUpgrade(upgrade.prevUpgrade as PlantUpgradeId)) {
            return false;
        }
        return upgrade.requirement.isCompleted;
    }

    get saveKey(): string {
        return this.id;
    }
    save(): UpgradeStateSaveData {
        return {
            purchased: this.purchased,
        };
    }
    load(data: UpgradeStateSaveData): void {
        this.purchased = data?.purchased ?? false;
    }

}