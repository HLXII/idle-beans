import { BeanType } from "@/scripts/bean/BeanList";
import { GameText } from "@/scripts/controls/GameText";
import Plant from "../Plant";
import { PlantUpgradeId } from "../upgrades/PlantUpgrades";
import BeanStalkState from "./BeanStalkState";

export default class BeanStalk extends Plant {
    public static state = BeanStalkState;

    get description(): GameText[] {
       return [
        `A Bean that will conquer the heavens. Consumes nearby ripe Beans every ${this.consumeCooldown} seconds.`,
       ];
    }

    upgrades: PlantUpgradeId[] = [
        'Stronger Roots',
    ];

    get consumeCooldown(): number {
        return 2;
    }

    /**
     * Determine the gain from cutting down the Bean Stalk
     * @param state The BeanStalkState
     */
    harvestGain(state: BeanStalkState): {[bean in BeanType]?: number} {
        // TODO: Calculate returns based on height
        return {[state.originBean]: 1};
    }
}