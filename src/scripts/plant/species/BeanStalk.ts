import { BeanType } from "@/scripts/bean/BeanList";
import Plant from "../Plant";
import { PlantUpgradeId } from "../upgrades/PlantUpgrades";
import BeanStalkState from "./BeanStalkState";

export default class BeanStalk extends Plant {
    public static state = BeanStalkState;

    upgrades: PlantUpgradeId[] = [
        'Stronger Roots',
    ];

    public consumeCooldown = 2;

    /**
     * Determine the gain from cutting down the Bean Stalk
     * @param state The BeanStalkState
     */
    harvestGain(state: BeanStalkState): {[bean in BeanType]?: number} {
        // TODO: Calculate returns based on height
        return {[state.originBean]: 1};
    }
}