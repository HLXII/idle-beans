import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";
import UpgradeState from "../../upgrades/UpgradeState";

export default class PurpleBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Purple Bean Plant.',
    ];

    upgrades: UpgradeState[] = [
        new UpgradeState('Wider Leaves', {'Sky Bean': 1}),
        new UpgradeState('Increased Bud Sites', {'Sky Bean': 2}),
        new UpgradeState('Stem Strength', {'Sky Bean': 3}),
    ];

    public produceBean: BeanType = 'Purple Bean';
    public baseProduceAmount = 2;
    public baseProduceTime = 20;
    public baseStorage = 10;

}