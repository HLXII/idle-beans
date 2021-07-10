import { BeanAmount } from "@/scripts/bean/BeanList";
import { GameText } from "@/scripts/controls/GameText";
import Plant from "../Plant";
import UpgradeState from "../upgrades/UpgradeState";
import BeanStalkState from "./BeanStalkState";

export default class BeanStalk extends Plant {
    public static state = BeanStalkState;

    baseDescription = [
        `A Bean that will conquer the heavens.`,
    ];

    get description(): GameText[] {
        return [
            ...this.baseDescription,
            `<br>Consumes nearby ripe Beans every ${this.consumeCooldown} seconds.`,
        ]
    }

    upgrades: UpgradeState[] = [

    ];
    get consumeCooldown(): number {
        return 2;
    }

    /**
     * Determine the gain from cutting down the Bean Stalk
     * @param state The BeanStalkState
     */
     removeGain(state: BeanStalkState): BeanAmount {
        // TODO: Calculate returns based on height
        return {[state.originBean]: 1};
    }
}