
import { App } from "@/App";
import { SaveData, Saveable } from "incremental-game-template";
import { LinkType } from "../controls/GameText";
import { BeanCategory, BeanImages } from "./BeanList";

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

    constructor(public name: string, public description: string, public category: BeanCategory, option?: BeanOptions) {
        this.unlocked = option?.unlocked ?? false;
    
        this.amount = option?.amount ?? 0;
    }

    unlock() {
        if (!this.unlocked) {
            // TODO: Handle adding wiki notification
            // TODO: Add setting to filter this message
            App.game.features.log.log([
                `You have discovered a new Bean: `,
                {text: this.name, type: LinkType.Bean, id: this.name},
            ]);
            this.unlocked = true;
        }
    }

    get image(): string {
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
        this.unlocked = data?.unlocked ?? false;
        this.amount = data?.amount ?? 0;
    }

}