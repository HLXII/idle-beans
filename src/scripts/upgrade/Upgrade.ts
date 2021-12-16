import { Saveable, SaveData, UpgradeId } from "incremental-game-template";
import { BeanAmount } from "../bean/BeanList";
import { GameText } from "../controls/GameText";
import { UpgradeImages } from "./UpgradeList";

export interface UpgradeSaveData extends SaveData {
    purchased: boolean;
}

export default class Upgrade implements Saveable {

    public description: GameText[];

    public purchased: boolean;

    constructor(public id: UpgradeId, description: GameText | GameText[], public cost: BeanAmount, public children: UpgradeId[] = []) {
        if (Array.isArray(description)) {
            this.description = description;
        } else {
            this.description = [description];
        }
        
        this.purchased = false;
    }

    get visible(): boolean {
        // TODO: Figure out this
        return true;
    }

    get image(): string {
        return UpgradeImages[this.id];
    }

    get saveKey(): string {
        return this.id;
    }
    save(): UpgradeSaveData {
        return {
            purchased: this.purchased,
        };
    }
    load(data: UpgradeSaveData): void {
        this.purchased = data.purchased ?? false;
    }

}

