
import { App } from "@/App";
import { SaveData, Saveable } from "incremental-game-template";
import { EntryType } from "../log/Log";
import { WikiEntry, WikiType } from "../wiki/Wiki";
import { BeanCategory, BeanImages } from "./BeanList";

export interface BeanOptions {
    unlocked?: boolean;
    amount?: number;
}

export interface BeanSaveData extends SaveData {
    unlocked: boolean;
    amount: number;
}

export default class Bean implements Saveable, WikiEntry {

    public unlocked: boolean;
    public amount: number;

    constructor(public name: string, public description: string, public category: BeanCategory, option?: BeanOptions) {
        this.unlocked = option?.unlocked ?? false;
    
        this.amount = option?.amount ?? 0;
    }

    unlock() {
        if (!this.unlocked) {
            App.game.features.log.log([
                `You have discovered a new Bean: `,
                {text: this.name, type: WikiType.Bean, id: this.name},
            ], EntryType.Unlock);
            this.unlocked = true;
        }
    }

    /**
     * WikiType
     */
    public type = 0;
    
    /**
     * Visiblity in the Wiki
     */
    get visible(): boolean {
        return this.unlocked;
    }

    /**
     * Vue component name for the Wiki entry
     */
    get component(): string {
        return 'wiki-bean';
    }

    /**
     * Bean Image
     */
    get image(): string {
        return BeanImages[this.name];
    }

    /**
     * Element ID for the Wiki entry
     */
     get elementName(): string {
        return this.name.toLowerCase().replace(/ /, '-');
    }

    get saveKey(): string {
        return this.name;
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