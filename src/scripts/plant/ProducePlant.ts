import Plant from './Plant';
import { PlantType } from './PlantList';
import Growth from './growths/Growth';
import ProducePlantState from './ProducePlantState';
import { BeanType } from '../bean/BeanList';

export default abstract class ProducePlant extends Plant {
    public static state = ProducePlantState;

    /**
     * Bean that is produced
     */
    public abstract produceBean: BeanType;

    /**
     * Amount of Bean produced per cycle
     */
    public abstract produceAmount: number;

    /**
     * Time required for a production cycle
     */
    public abstract produceTime: number;

    /**
     * Total Beans that can be stored on the plant
     */
    public abstract holdCap: number;

}