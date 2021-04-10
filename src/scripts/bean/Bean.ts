import { Saveable } from "@/ig-template/tools/saving/Saveable";
import { SaveData } from "@/ig-template/tools/saving/SaveData";
import { BeanImages } from "./BeanList";

export interface BeanOptions {
    unlocked?: boolean;
    globalUnlocked?: boolean;

    amount?: number;
}

export interface BeanSaveData extends SaveData {
    unlocked: boolean;
    globalUnlocked: boolean;
    amount: number;
}

export default class Bean implements Saveable {

    public unlocked: boolean;
    public globalUnlocked: boolean;

    public amount: number;

    constructor(public name: string, option?: BeanOptions) {
        this.unlocked = option?.unlocked ?? false;
        this.globalUnlocked = option?.globalUnlocked ?? false;
    
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

    save(): BeanSaveData {
        return {
            unlocked: this.unlocked,
            globalUnlocked: this.globalUnlocked,

            amount: this.amount,
        }
    }

    load(data: BeanSaveData): void {
        this.unlocked = data.unlocked ?? false;
        this.globalUnlocked = data.globalUnlocked ?? false;
        this.amount = data.amount ?? 0;
    }

}