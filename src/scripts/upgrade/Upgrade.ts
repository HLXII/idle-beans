import { NoRequirement, Requirement, Saveable, SaveData } from "incremental-game-template";
import { BeanAmount } from "../bean/BeanList";
import { GameText } from "../controls/GameText";

export interface UpgradeSaveData extends SaveData {
    purchased: boolean;
}

export default class Upgrade implements Saveable {

    public description: GameText[];

    public purchased: boolean;

    constructor(public name: string, description: GameText | GameText[], public cost: BeanAmount, public requirement: Requirement = new NoRequirement()) {
        if (Array.isArray(description)) {
            this.description = description;
        } else {
            this.description = [description];
        }
        
        this.purchased = false;
    }

    get visible(): boolean {
        return this.requirement.isCompleted;
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

