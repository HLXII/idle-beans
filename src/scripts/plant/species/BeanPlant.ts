import { BeanType } from "../../bean/BeanList";
import Plant from "../Plant";
import PlantState from "../PlantState";
import ProducePlant from "../ProducePlant";

export default class BeanPlant extends ProducePlant {

    produceBean: BeanType;

    constructor(name: string, public bean: string) {
        super(name);
        
        this.produceBean = this.bean as BeanType;
    }

    // TODO: Update to handle upgrades/different plants
    produceAmount = 1;
    produceTime = 10;

    /**
     * Determines the beans returned from removing the plant
     * To be overriden in sub classes.
     * @param state The PlantState
     */
    harvestGain(state: PlantState): {[bean in BeanType]?: number} {
        // TODO: Handle more gain from harvests?
        return {[this.bean]: 2};
    }

}