
import { SaveData, Saveable } from "incremental-game-template";
import { BeanImages } from "./BeanList";

export interface BeanOptions {
    unlocked?: boolean;

    amount?: number;
}

export interface BeanSaveData extends SaveData {
    unlocked: boolean;
    amount: number;
}

export default class Bean implements Saveable {

    public unlocked: boolean;

    public amount: number;

    constructor(public name: string, public description: string, option?: BeanOptions) {
        this.unlocked = option?.unlocked ?? false;
    
        this.amount = option?.amount ?? 0;
    }

    get image(): any {
        return BeanImages[this.name];
    }

    get tooltip(): string {
        return `${this.name}: ${this.amount}`;
    }

    get saveKey(): string {
        return this.name;
    }

    /**
     * Return the element ID name in the Wiki
     */
     get elementName(): string {
        return this.name.toLowerCase().replace(/ /, '-');
    }

    save(): BeanSaveData {
        return {
            unlocked: this.unlocked,
            amount: this.amount,
        }
    }

    load(data: BeanSaveData): void {
        this.unlocked = data.unlocked ?? false;
        this.amount = data.amount ?? 0;
    }

}