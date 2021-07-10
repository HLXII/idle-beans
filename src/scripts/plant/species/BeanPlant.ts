import { GameText } from "@/scripts/controls/GameText";
import { BeanAmount, BeanType } from "../../bean/BeanList";
import { PlantOptions } from "../Plant";
import { PlantCategory } from "../PlantList";
import PlantState from "../PlantState";
import ProducePlant from "../ProducePlant";
import UpgradeState from "../upgrades/UpgradeState";

export default class BeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Bean Plant. TEMP',
    ];

    upgrades: UpgradeState[] = [
        new UpgradeState('Stronger Roots', {'Sky Bean': 1}),
    ];

    public baseProduceAmount = 1;
    public baseProduceTime = 10;
    public baseStorage = 15;

    produceBean: BeanType;

    constructor(name: string, category: PlantCategory, level: number, public bean: string, option?: PlantOptions) {
        super(name, category, level, option);
        
        this.produceBean = this.bean as BeanType;
    }

    /**
     * Determines the beans returned from removing the plant
     * To be overriden in sub classes.
     * @param state The PlantState
     */
     removeGain(state: PlantState): BeanAmount {
        // TODO: Handle more gain from harvests?
        return {[this.bean]: 2};
    }

}