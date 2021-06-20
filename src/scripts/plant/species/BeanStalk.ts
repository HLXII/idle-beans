import { BeanType } from "@/scripts/bean/BeanList";
import Plant from "../Plant";
import BeanStalkState from "./BeanStalkState";

export default class BeanStalk extends Plant {
    public static state = BeanStalkState;

    /**
     * Determine the gain from cutting down the Bean Stalk
     * @param state The BeanStalkState
     */
    harvestGain(state: BeanStalkState): {[bean in BeanType]?: number} {
        // TODO: Calculate returns based on height
        return {[state.originBean]: 1};
    }
}