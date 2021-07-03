import { Features } from "@/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import { BeanCategory, BeanType } from "../bean/BeanList";
import Beans from "../bean/Beans";
import Log from "../log/Log";
import BeanStalkPrestige from "./BeanStalkPrestige";
import Prestige from "./Prestige";

export default class PrestigeHandler extends IgtFeature {
    
    private beans!: Beans;
    private log!: Log;

    public prestiges!: Prestige[];

    // TODO: Handle prestige bonus goals

    constructor() {
        super('prestige');
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
        // Switch state to prestige

        // Clean up inventory
        Object.values(this.beans.list).forEach((bean) => {
            if (bean.category !== BeanCategory.Special) {
                this.beans.gain(bean.name as BeanType, -bean.amount)
            }
        });
        
        // Clear farms
        

        // Clear log
        this.log.clearLog();
        
        return;
    }

    load(data: SaveData): void {
        return;
    }
    save(): SaveData {
        return {};
    }

}