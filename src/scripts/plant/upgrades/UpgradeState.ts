import { BeanAmount } from "@/scripts/bean/BeanList";
import { Saveable, SaveData } from "incremental-game-template";
import { PlantUpgradeId } from "./PlantUpgrades";

export interface UpgradeStateSaveData extends SaveData {
    purchased: boolean;
}

export default class UpgradeState implements Saveable {
    
    public purchased: boolean;

    constructor(public id: PlantUpgradeId, public cost: BeanAmount) {
        this.purchased = false;
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