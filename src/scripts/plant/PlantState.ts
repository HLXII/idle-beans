import { App } from "@/App";
import { Saveable } from "@/ig-template/tools/saving/Saveable";
import { SaveData } from "@/ig-template/tools/saving/SaveData";
import GameHelper from "@/scripts/GameHelper";
import { BeanType } from "../bean/BeanList";
import FarmLocation from "../farm/FarmLocation";
import { FarmType } from "../farm/FarmType";
import Plot from "../farm/Plot";
import Plant from "./Plant";
import { PlantType } from './PlantList';

export interface PlantStateSaveData extends SaveData, FarmLocation {
    stateClass: string;
    type: PlantType;
    originBean: BeanType;
    age: number;
}

export default class PlantState implements Saveable, FarmLocation {

    /** Type of Plant for this state */
    public type: PlantType;

    /** Position in the Farm */
    public farm!: FarmType;
    public row!: number;
    public col!: number;

    /** Original Bean used to grow this Plant */
    public originBean: BeanType;

    /** Age (in milliseconds) */
    public age: number;

    constructor(type: PlantType, location?: FarmLocation) {
        this.type = type;

        if (location) {
            this.farm = location.farm;
            this.row = location.row;
            this.col = location.col;
        }

        this.originBean = 'Bean';
        this.age = 0;
    }

    /**
     * Updates the plant every game tick
     * @param delta The time passed (ms)
     */
    update(delta: number) {
        this.age += delta;
    }

    /**
     * Handles harvesting this plant
     */
    handleRemove() {
        // Gaining harvest cost
        const harvestGain = this.harvestGain;
        console.log(harvestGain);
        for (const bean in harvestGain) {
            App.game.features.beans.gain(bean as BeanType, harvestGain[bean as BeanType]);
        }
        // Logging harvest
        // TODO
        //const gainedBeans = Object.entries(harvestGain).map(([key, amount]) => `${amount} ${key}${Number(amount) > 1 ? 's' : ''}`).join(', ');
        //App.game.log.log(`Removed a ${this.plant}. Gained: ${gainedBeans}.`);
    }

    get harvestGain(): {[bean in BeanType]?: number} {
        return this.data.harvestGain(this);
    }

    get harvestGainMessage(): string {
        const message = [];
        message.push('Harvesting this plant will return:');
        const harvestGain = this.harvestGain;
        for (const bean in harvestGain) {
            const amount = harvestGain[bean as BeanType] ?? 0;
            message.push(`${amount} ${bean}${amount > 1 ? 's' : ''}`);
        }
        return message.join('<br>');
    }

    /**
     * Returns the Plant object associated with this PlantState
     */
    get data(): Plant {
         return App.game.features.plants.list[this.type];
    }

    /**
     * Obtains the Plot the Plant is on
     */
    get plot(): Plot {
        return App.game.features.farms.farms[this.farm].plots[this.row][this.col];
    }

    /**
     * Returns the Plant image component name
     */
    get image(): string {
        return this.data.image;
    }

    get template(): string {
        return this.constructor.name;
    }

    //#region Save
    saveKey = '';
    save(): PlantStateSaveData {
        return {
            stateClass: this.constructor.name,
            type: this.type,
            farm: this.farm,
            row: this.row,
            col: this.col,
            originBean: this.originBean,
            age: this.age,
        };
    }
    load(data: PlantStateSaveData): void {
        this.type = data.type ?? 'Bean Bud';
        this.farm = data.farm ?? FarmType.farm;
        this.row = data.row ?? 0;
        this.col = data.col ?? 0;
        this.originBean = data.originBean ?? 'Bean';
        this.age = data.age ?? 0;
    }
    //#endregion

}