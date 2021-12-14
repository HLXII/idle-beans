import { App } from '@/App';
import { SaveData, Saveable } from 'incremental-game-template';
import { BeanAmount } from '../bean/BeanList';
import { GameText } from '../controls/GameText';
import FarmLocation from '../farm/FarmLocation';
import { EntryType } from '../log/Log';
import { PlantIcons, SVGData } from './PlantImages';
import { PlantCategory, PlantType } from './PlantList';
import PlantState from './PlantState';
import { WikiEntry } from "../wiki/Wiki";
import { WikiType } from '../wiki/WikiType';

export interface PlantOptions {
    unlocked?: boolean;
}

export interface PlantSaveData extends SaveData {
    unlocked: boolean;
}

export default abstract class Plant implements Saveable, WikiEntry {
    public static state = PlantState;

    public unlocked: boolean;

    /**Base Plant Description */
    abstract baseDescription: GameText[];
    /**Plant Description */
    abstract description: GameText[];

    constructor(public name: string, public category: PlantCategory, option?: PlantOptions) {
        this.unlocked = option?.unlocked ?? false;
    }

    /**
     * Determines the beans returned from removing the plant
     * To be overriden in sub classes.
     * @param state The PlantState
     */
    removeGain(state: PlantState): BeanAmount {
        return {[state.originBean]: 1};
    }

    unlock() {
        if (!this.unlocked) {
            App.game.features.log.log([
                `You have discovered a new Plant: `,
                {text: this.name, type: WikiType.Plant, id: this.name},
            ], EntryType.Unlock);
            this.unlocked = true;
        }
    }

    state(location?: FarmLocation): PlantState {
        return new (this.constructor as typeof Plant).state(this.name as PlantType, location);
    }

    /**
     * WikiType
     */
    type: WikiType = WikiType.Plant;

    /**
     * Visiblity in the Wiki 
     */
    get visible(): boolean {
        return this.unlocked;
    }

    /**
     * Wiki Vue component
     */
    get component(): string {
        return 'wiki-plant';
    }

    /**
     * Plant Icon SVG Data
     */
    get icon(): SVGData {
        return PlantIcons[this.name] ?? PlantIcons['Missing Plant'];
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
    save(): PlantSaveData {
        return {
            unlocked: this.unlocked,
        };
    }
    load(data: PlantSaveData): void {
        this.unlocked = data.unlocked ?? false;
    }

}