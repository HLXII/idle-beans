import { App } from '@/App';
import { SaveData, Saveable } from 'incremental-game-template';
import { BeanAmount } from '../bean/BeanList';
import { GameText, LinkType } from '../controls/GameText';
import FarmLocation from '../farm/FarmLocation';
import { PlantIcons, SVGData } from './PlantImages';
import { PlantCategory, PlantType } from './PlantList';
import PlantState from './PlantState';
import UpgradeState from './upgrades/UpgradeState';

export interface PlantOptions {
    unlocked?: boolean;
}

interface PlantUpgradeSaveData extends SaveData {
    [key: string]: boolean;
}

export interface PlantSaveData extends SaveData {
    unlocked: boolean;
    upgrades: PlantUpgradeSaveData;
}

export default abstract class Plant implements Saveable {
    public static state = PlantState;

    public unlocked: boolean;

    /**Available Plant Upgrades */
    abstract upgrades: UpgradeState[];
    /**Plant Description */
    abstract description: GameText[];

    constructor(public name: string, public level: number, public category: PlantCategory, option?: PlantOptions) {
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
            // TODO: Handle adding wiki notification
            // TODO: Add setting to filter this message
            App.game.features.log.log([
                `You have discovered a new Plant: `,
                {text: this.name, type: LinkType.Plant, id: this.name},
            ]);
            this.unlocked = true;
        }
    }

    state(location?: FarmLocation): PlantState {
        return new (this.constructor as typeof Plant).state(this.name as PlantType, location);
    }

    /**
     * Returns whether we have purchased all upgrades on this Plant
     */
    get purchasedAllUpgrades(): boolean {
        return this.upgrades.every((upgrade) => upgrade.purchased);
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
        const upgrades: PlantUpgradeSaveData = {};
        this.upgrades.forEach((upgradeState) => {
            upgrades[upgradeState.id] = upgradeState.purchased;
        });
        return {
            unlocked: this.unlocked,
            upgrades: upgrades,
        };
    }
    load(data: PlantSaveData): void {
        this.unlocked = data.unlocked ?? false;
        this.upgrades.forEach((upgradeState) => {
            upgradeState.load({ purchased: data.upgrades[upgradeState.id] });
        });
    }

}