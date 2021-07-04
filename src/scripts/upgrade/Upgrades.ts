import { Features } from "@/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import Beans from "../bean/Beans";
import Upgrade, { UpgradeSaveData } from "./Upgrade";
import { UpgradeId, UpgradeList } from "./UpgradeList";


interface UpgradesSaveData extends SaveData {
    [key: string]: UpgradeSaveData;
}

export default class Upgrades extends IgtFeature {

    /**Internal references */
    private beans!: Beans;

    public list: Record<UpgradeId, Upgrade> = UpgradeList;

    constructor() {
        super('upgrades');
    }

    initialize(features: Features) {
        this.beans = features.beans;
    }
    canAccess(): boolean {
        return true;
    }

    purchaseUpgrade(upgradeId: UpgradeId) {
        const upgrade = this.list[upgradeId];
        if (!upgrade) {
            console.error(`Error - Upgrade "${upgradeId}" not found.`);
            return;
        }
        if (upgrade.purchased) {
            console.error(`Error - Upgrade "${upgradeId}" was already purchased.`);
            return;
        }

        if (!this.beans.canAfford(upgrade.cost)) {
            console.error(`Error - Upgrade "${upgradeId}" cannot be purchased.`);
            return;
        }

        this.beans.takeAmount(upgrade.cost);
        upgrade.purchased = true;
    }

    saveKey = 'upgrades';
    save(): UpgradesSaveData {
        const data: UpgradesSaveData = {};
        Object.values(this.list).map((upgrade) => {
            data[upgrade.name] = upgrade.save();
        });
        return data;
    }
    load(data: UpgradesSaveData): void {
        Object.entries(data).map(([upgradeId, upgradeData]) => {
            this.list[upgradeId as UpgradeId].load(upgradeData);
        });
    }

}
