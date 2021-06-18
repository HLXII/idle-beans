import { App } from '@/App';
import { Saveable } from '@/ig-template/tools/saving/Saveable';
import { SaveData } from '@/ig-template/tools/saving/SaveData';
import { BeanType } from '../bean/BeanList';
import FarmLocation from '../farm/FarmLocation';
import { PlantIcons, PlantType } from './PlantList';
import PlantState from './PlantState';

export interface PlantSaveData extends SaveData {
    unlocked: boolean;
    globalUnlocked: boolean;
}

export default class Plant implements Saveable {
    public static state = PlantState;

    public unlocked: boolean;
    public globalUnlocked: boolean;

    constructor(public name: string) {
        this.unlocked = false;
        this.globalUnlocked = false;
    }

    /**
     * Determines the beans returned from removing the plant
     * To be overriden in sub classes.
     * @param state The PlantState
     */
    harvestGain(state: PlantState): {[bean in BeanType]?: number} {
        return {[state.originBean]: 1};
    }

    unlock() {
        if (!this.globalUnlocked) {
            // TODO: Handle global unlock message?
            // TODO: Handle updating plant wiki
            // TODO: Handle adding wiki notification
            this.globalUnlocked = true;
        }

        if (!this.unlocked) {
            // TODO: Add setting to filter this message
            App.game.features.log.log(`You have discovered a new plant: ${this.name}`);
            this.unlocked = true;
        }
    }

    state(location?: FarmLocation): PlantState {
        return new (this.constructor as typeof Plant).state(this.name as PlantType, location);
    }

    get icon(): any {
        return PlantIcons[this.name];
    }

    get saveKey(): string {
        return this.name;
    }
    save(): PlantSaveData {
        return {
            unlocked: this.unlocked,
            globalUnlocked: this.globalUnlocked,
        };
    }
    load(data: PlantSaveData): void {
        this.unlocked = data.unlocked ?? false;
        this.globalUnlocked = data.globalUnlocked ?? false;
    }

}