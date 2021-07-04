import { Saveable, SaveData } from "incremental-game-template";
import { BeanAmount } from "../bean/BeanList";
import { GameText } from "../controls/GameText";

export interface UpgradeSaveData extends SaveData {
    purchased: boolean;
}

export default class Upgrade implements Saveable {

    public purchased: boolean;

    constructor(public name: string, public description: GameText[], public cost: BeanAmount) {
        this.purchased = false;
    }

    get saveKey(): string {
        return this.name;
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

