import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../bean/BeanList";
import { PlantOptions } from "../Plant";
import { PlantCategory } from "../PlantList";
import PlantState from "../PlantState";
import ProducePlant from "../ProducePlant";
import { PlantUpgradeId } from "../upgrades/PlantUpgrades";

export default class BeanPlant extends ProducePlant {
    
    description: GameText[] = [
        'Just a simple Bean Plant. TEMP',
    ];

    upgrades: PlantUpgradeId[] = [
        'Stronger Roots',
    ];

    produceBean: BeanType;

    constructor(name: string, category: PlantCategory, public bean: string, option?: PlantOptions) {
        super(name, category, option);
        
        this.produceBean = this.bean as BeanType;
    }

    // TODO: Update to handle upgrades/different plants
    produceAmount = 1;
    produceTime = 10;
    holdCap = 15;
    
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