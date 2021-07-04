import { App } from '@/App';
import { SaveData, Saveable } from 'incremental-game-template';
import { BeanAmount, BeanType } from '../bean/BeanList';
import { GameText, LinkType } from '../controls/GameText';
import FarmLocation from '../farm/FarmLocation';
import { PlantIcons, SVGData } from './PlantImages';
import { PlantCategory, PlantType } from './PlantList';
import PlantState from './PlantState';
import { PlantUpgradeId } from './upgrades/PlantUpgrades';

export interface PlantOptions {
    unlocked?: boolean;
}

export interface PlantSaveData extends SaveData {
    unlocked: boolean;
    purchasedUpgrades: PlantUpgradeId[];
}

export default abstract class Plant implements Saveable {
    public static state = PlantState;

    public unlocked: boolean;

    /**Available Plant Upgrades */
    abstract upgrades: PlantUpgradeId[];
    /**Plant Description */
    abstract description: GameText[];

    public purchasedUpgrades: PlantUpgradeId[];

    constructor(public name: string, public category: PlantCategory, option?: PlantOptions) {
        this.unlocked = option?.unlocked ?? false;
        this.purchasedUpgrades = [];
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
            // TODO: Handle adding wiki notification
            // TODO: Add setting to filter this message
            App.game.features.log.log([
                `You have discovered a new plant: `,
                {text: this.name, type: LinkType.Plant, id: this.name},
            ]);
            this.unlocked = true;
        }
    }

    state(location?: FarmLocation): PlantState {
        return new (this.constructor as typeof Plant).state(this.name as PlantType, location);
    }

    /**
     * Returns the Plant Icon SVG Data
     */
    get icon(): SVGData {
        return PlantIcons[this.name] ?? PlantIcons['Missing Plant'];
    }

    /**
     * Return the element ID name in the Wiki
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
            purchasedUpgrades: this.purchasedUpgrades,
        };
    }
    load(data: PlantSaveData): void {
        this.unlocked = data.unlocked ?? false;
        if (data.purchasedUpgrades && data.purchasedUpgrades.length) {
            this.purchasedUpgrades = data.purchasedUpgrades.filter((upgrade) => this.upgrades.includes(upgrade));
        } else {
            this.purchasedUpgrades = [];
        }
    }

}