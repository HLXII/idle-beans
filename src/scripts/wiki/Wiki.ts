import { Features } from "@/Features";
import { SaveData, IgtFeature } from "incremental-game-template";
import Beans from "../bean/Beans";
import Plants from "../plant/Plants";


export interface WikiSaveData extends SaveData {

}

export default class Wiki extends IgtFeature {

    /**Internal reference to Features */
    private beans!: Beans;
    private plants!: Plants;

    constructor() {
        super('wiki');
    }

    initialize(features: Features): void {
        this.beans = features.beans;
        this.plants = features.plants;
    }
    canAccess(): boolean {
        return true;
    }

    

    load(data: WikiSaveData): void {
        // TODO:
        return;
    }
    save(): WikiSaveData {
        // TODO:
        return {};
    }
}