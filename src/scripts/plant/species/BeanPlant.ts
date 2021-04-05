import { BeanType } from "../../bean/BeanList";
import Plant from "../Plant";
import PlantState from "../PlantState";

export default class BeanPlant extends Plant {

    constructor(name: string, public bean: string) {
        super(name);
    }

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