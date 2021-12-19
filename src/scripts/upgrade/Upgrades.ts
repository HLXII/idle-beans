import { Features } from "@/Features";
import { IgtFeature, SaveData, UpgradeId } from "incremental-game-template";
import Beans from "../bean/Beans";
import Upgrade, { UpgradeSaveData } from "./Upgrade";
import { UpgradeList } from "./UpgradeList";


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

    /**
     * 
     * @param upgradeId The UpgradeId
     * @param debug Set to true if we want to print debug strings. Defaults to false.
     * @returns True if the Upgrade can be purchased. False otherwise.
     */
    canPurchaseUpgrade(upgradeId: UpgradeId, debug: boolean = false) {
        const upgrade = this.list[upgradeId];
        if (!upgrade) {
            if (debug) { console.error(`Error - Upgrade "${upgradeId}" not found.`); }
            return false;
        }
        if (!upgrade.visible) {
            if (debug) { console.error(`Error - Upgrade "${upgradeId}" isn't purchaseable yet.`); }
            return false;
        }
        if (upgrade.purchased) {
            if (debug) { console.error(`Error - Upgrade "${upgradeId}" was already purchased.`); }
            return false;
        }

        if (!this.beans.canAfford(upgrade.cost)) {
            if (debug) { console.error(`Error - Upgrade "${upgradeId}" cannot be purchased.`); }
            return false;
        }

        return true;
    }

    /**
     * Attempts to purchase the Upgrade. Assumes the upgrade can already be purchased.
     * @param upgradeId The UpgradeId
     * @returns True if the upgrade was purchased successfully. False otherwise.
     */
    purchaseUpgrade(upgradeId: UpgradeId): boolean {
        if (!this.canPurchaseUpgrade(upgradeId, true)) {
            return false;
        }

        const upgrade = this.list[upgradeId];
        this.beans.takeAmount(upgrade.cost);
        upgrade.purchased = true;

        return true;
    }

    saveKey = 'upgrades';
    save(): UpgradesSaveData {
        const data: UpgradesSaveData = {};
        Object.values(this.list).map((upgrade) => {
            data[upgrade.id] = upgrade.save();
        });
        return data;
    }
    load(data: UpgradesSaveData): void {
        Object.entries(data).map(([upgradeId, upgradeData]) => {
            if (this.list[upgradeId as UpgradeId]) {
                this.list[upgradeId as UpgradeId].load(upgradeData);
            } else {
                console.error(`Error - Upgrade ${upgradeId} was not found in list and could not be loaded.`)
            }
        });
    }

}
