import { Features } from "@/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import { BeanCategory, BeanType } from "../bean/BeanList";
import Beans from "../bean/Beans";
import Log from "../log/Log";
import BeanStalkPrestige from "./BeanStalkPrestige";
import Prestige from "./Prestige";

export interface PrestigeSaveData extends SaveData {
    prestiged: boolean;
}

export default class PrestigeHandler extends IgtFeature {
    
    private beans!: Beans;
    private log!: Log;

    public prestiges!: Prestige[];

    // TODO: Handle prestige bonus goals

    public prestiged: boolean;

    constructor() {
        super('prestige');

        this.prestiged = false;
    }

    initialize(features: Features): void {
        this.beans = features.beans;
        this.log = features.log;

        this.prestiges = [
            new BeanStalkPrestige(features),
        ];
    }

    applyModifiers(value: number): number {
        // TODO: Handle bonus modifiers
        return value;
    }

    /**
     * Handle cleanup up the game state to enter prestige mode
     */
    triggerPrestige() {
        // Clean up inventory
        Object.values(this.beans.list).forEach((bean) => {
            if (bean.category !== BeanCategory.Special) {
                this.beans.gain(bean.name as BeanType, -bean.amount)
            }
        });
        
        // Clear farms
        // TODO

        // Clear log
        this.log.clearLog();

        // Switch state to prestige
        this.prestiged = true;
    }

    /**
     * Handle finishing up prestige mode and returning to the main game
     */
    completePrestige() {
        // Handle Bean Packet purchases
        // TODO

        // Switch state to main game
        this.prestiged = false;
    }

    load(data: PrestigeSaveData): void {
        this.prestiged = data.prestiged ?? false;
    }
    save(): PrestigeSaveData {
        return {
            prestiged: this.prestiged,
        };
    }

}