import Plant from './Plant';
import ProducePlantState from './ProducePlantState';
import { BeanType } from '../bean/BeanList';
import { GameText } from '../controls/GameText';

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
        // TODO: Handle Upgrades and Statuses
        return this.baseProduceAmount;
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
        // TODO: Handle Upgrades and Statuses
        return this.baseProduceTime;
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
        // TODO: Handle Upgrades and Statuses
        return this.baseStorage;
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