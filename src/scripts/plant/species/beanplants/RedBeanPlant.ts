import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";
import UpgradeState from "../../upgrades/UpgradeState";

export default class RedBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Red Bean Plant.',
    ];

    upgrades: UpgradeState[] = [
        new UpgradeState('Wider Leaves', {'Sky Bean': 1}),
        new UpgradeState('Increased Bud Sites', {'Sky Bean': 2}),
        new UpgradeState('Stem Strength', {'Sky Bean': 3}),
    ];

    public produceBean: BeanType = 'Red Bean';
    public baseProduceAmount = 1;
    public baseProduceTime = 15;
    public baseStorage = 16;

}