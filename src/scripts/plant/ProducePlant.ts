import Plant from './Plant';
import ProducePlantState from './ProducePlantState';
import { BeanAmount, BeanType } from '../bean/BeanList';
import { GameText } from '../controls/GameText';
import { App } from '@/App';

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
        const produceAmount = this.baseProduceAmount;

        // TODO: Handle Upgrades

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
        const produceTime = this.baseProduceTime;

        // TODO: Handle Upgrades

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
        const storage = this.baseStorage;

        // TODO: Handle Upgrades

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

    /**
     * Determines the beans returned from removing the plant
     * @param state The PlantState
     */
     removeGain(state: ProducePlantState): BeanAmount {
        return {[this.produceBean]: 2};
    }

}