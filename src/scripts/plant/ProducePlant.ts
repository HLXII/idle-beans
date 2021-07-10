import Plant from './Plant';
import ProducePlantState from './ProducePlantState';
import { BeanType } from '../bean/BeanList';
import { GameText } from '../controls/GameText';
import { App } from '@/App';
import ModifierUpgrade from './upgrades/ModifierUpgrade';
import { PlantEffectId } from './upgrades/PlantEffectId';

export default abstract class ProducePlant extends Plant {
    public static state = ProducePlantState;

    /**
     * Bean that is produced
     */
    public abstract produceBean: BeanType;

    /**
     * Base amount of Bean produced per cycle
     */
    public abstract baseProduceAmount: number;

    /**
     * Amount of Beans produced per cycle, taking into account modifiers
     * If the ProducePlantState is given, will also take into account status effects
     * @param state The ProducePlantState
     * @returns Amount of Beans produced per cycle
     */
    public produceAmount(state?: ProducePlantState) {
        let produceAmount = this.baseProduceAmount;

        // Handle Upgrades
        this.upgrades.filter((upgradeState) => upgradeState.purchased).map((upgradeState) => {
            return App.game.features.plants.upgrades[upgradeState.id];
        }).forEach((upgrade) => {
            if (upgrade instanceof ModifierUpgrade) {
                produceAmount = upgrade.applyEffect(produceAmount, PlantEffectId.RipeAmount);
            }
        });

        // TODO: Handle Statuses

        return produceAmount;
    }

    /**
     * Base time required for a production cycle
     */
    public abstract baseProduceTime: number;

    /**
     * Time required for a production cycle, taking into account modifiers
     * If the ProducePlantState is given, will also take into account status effects
     * @param state The ProducePlantState
     * @returns Time required for a production cycle
     */
     public produceTime(state?: ProducePlantState) {
        let produceTime = this.baseProduceTime;

        // Handle Upgrades
        this.upgrades.filter((upgradeState) => upgradeState.purchased).map((upgradeState) => {
            return App.game.features.plants.upgrades[upgradeState.id];
        }).forEach((upgrade) => {
            if (upgrade instanceof ModifierUpgrade) {
                produceTime = upgrade.applyEffect(produceTime, PlantEffectId.RipeTime);
            }
        });

        // TODO: Handle Statuses

        return produceTime;
    }

    /**
     * Base maximum Beans that can be stored on the Plant
     */
    public abstract baseStorage: number;

    /**
     * Maximum Beans that can be stored on the Plant, taking into account modifiers
     * If the ProducePlantState is given, will also take into account status effects
     * @param state The ProducePlantState
     * @returns Maximum Beans that can be stored on the Plant
     */
     public storage(state?: ProducePlantState) {
        let storage = this.baseStorage;

        // Handle Upgrades
        this.upgrades.filter((upgradeState) => upgradeState.purchased).map((upgradeState) => {
            return App.game.features.plants.upgrades[upgradeState.id];
        }).forEach((upgrade) => {
            if (upgrade instanceof ModifierUpgrade) {
                storage = upgrade.applyEffect(storage, PlantEffectId.Storage);
            }
        });

        // TODO: Handle Statuses

        return storage;
    }

    get description(): GameText[] {
        return [
            ...this.baseDescription,
            '<br>',
            `Produces ${this.produceAmount()} ${this.produceBean} every ${this.produceTime()} seconds.<br>`,
            `Can store ${this.storage()} Beans.`, 
        ];
    }

}