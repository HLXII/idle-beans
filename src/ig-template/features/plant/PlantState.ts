import { App } from "@/App";
import { Saveable } from "@/ig-template/tools/saving/Saveable";
import { SaveData } from "@/ig-template/tools/saving/SaveData";
import GameHelper from "@/ig-template/util/GameHelper";
import { BeanType } from "../bean/BeanList";
import Plot from "../farm/Plot";
import Plant from "./Plant";
import { PlantType } from './PlantList';

export interface PlantStateSaveData extends SaveData {
    stateClass: string;
    plant: PlantType;
    originBean: BeanType;
    age: number;
    stageAge: number;
}

export default class PlantState implements Saveable {

    public originBean: BeanType;

    public age: number;
    public stageAge: number;

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

    constructor(public plant: PlantType) {
        this.originBean = 'Bean';
        this.age = 0;
        this.stageAge = 0;
    }

    /**
     * Updates the plant every game tick
     * @param delta The time passed (ms)
     */
    update(delta: number, plot: Plot) {
        this.age += delta;
        this.stageAge += delta;
    }

    /**
     * Grows the plant into a new plant type
     * @param plot The plot whose plant is growing
     * @param plant The plant type
     */
    grow(plot: Plot, plant: PlantType) {
        const oldState = plot.plant;
        // Sanity check
        if (!oldState) {
            console.error(`Error: - Attempting to grow plant that does not exist - ${this} - ${plot}, ${plant}`);
            return;
        }

        // Generating new state
        const newPlant = App.game.features.plants.list[plant];
        const newState = newPlant.state();
        const oldStateData = oldState.save();
        oldStateData.plant = plant;
        oldStateData.stageAge = 0;
        newState.load(oldStateData);
        plot.plant = newState;

        // Unlocking plant
        newPlant.unlock();
    }

    /**
     * Handles removing this plant
     * @param plot The plant's plot
     */
    handleRemove(plot: Plot) {
        // Gaining harvest cost
        const harvestGain = this.harvestGain;
        for (const bean in harvestGain) {
            App.game.features.beans.gain(bean as BeanType, harvestGain[bean as BeanType]);
        }
        const gainedBeans = Object.entries(harvestGain).map(([key, amount]) => `${amount} ${key}${Number(amount) > 1 ? 's' : ''}`).join(', ');
        //App.game.log.log(`Removed a ${this.plant}. Gained: ${gainedBeans}.`);
    }

    get data(): Plant {
        if (this.plant) {
            return App.game.features.plants.list[this.plant];
        } else {
            return App.game.features.plants.list['Bean Bud'];
        }
    }

    get image(): string {
        return this.data.image;
    }

    get template(): string {
        return this.constructor.name;
    }

    // TODO: Not sure if need one
    saveKey = '';
    save(): PlantStateSaveData {
        return {
            stateClass: this.constructor.name,
            plant: this.plant,
            originBean: this.originBean,
            age: this.age,
            stageAge: this.stageAge,
        };
    }
    load(data: PlantStateSaveData): void {
        this.plant = data.plant ?? 'Bean Bud';
        this.originBean = data.originBean ?? 'Bean';
        this.age = data.age ?? 0;
        this.stageAge = data.stageAge ?? 0;
    }

}