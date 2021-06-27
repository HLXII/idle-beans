import { Features } from "@/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import BeanStalkPrestige from "./BeanStalkPrestige";
import Prestige from "./Prestige";

export default class PrestigeHandler extends IgtFeature {
    
    public prestiges!: Prestige[];

    // TODO: Handle prestige bonus goals

    constructor() {
        super('prestige');
    }

    initialize(features: Features): void {
        this.prestiges = [
            new BeanStalkPrestige(features),
        ];
    }

    load(data: SaveData): void {
        return;
    }
    save(): SaveData {
        return {};
    }

}