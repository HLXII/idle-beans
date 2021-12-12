import { BeanAmount } from "@/scripts/bean/BeanList";
import { GameText } from "@/scripts/controls/GameText";
import BeanStalkPrestige from "@/scripts/prestige/BeanStalkPrestige";
import Plant from "../Plant";
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

    get consumeCooldown(): number {
        // TODO: Handle upgrades
        return 2;
    }

    removeGain(state: BeanStalkState): BeanAmount {
        if (state.height < BeanStalkPrestige.prestigeHeight) {
            return {[state.originBean]: 1};
        } else {
            return {'Magic Bean': state.height - BeanStalkPrestige.prestigeHeight + 1}
        }
    }
}