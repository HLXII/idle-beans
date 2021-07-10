import { App } from "@/App";
import { Requirement } from "incremental-game-template";
import { UpgradeId } from "./UpgradeList";

export default class UpgradePurchasedRequirement extends Requirement {

    constructor(public upgradeId: string) {
        super();
    }

    get hint(): string {
        return `Purchase the Upgrade "${this.upgradeId}"`;
    }
    get actualValue(): number {
        return +App.game.features.upgrades.list[this.upgradeId as UpgradeId].purchased;
    }
    get targetValue(): number {
        return 1;
    }

}