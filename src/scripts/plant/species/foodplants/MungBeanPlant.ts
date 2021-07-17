import { BeanType } from "@/scripts/bean/BeanList";
import { GameText } from "@/scripts/controls/GameText";
import ProducePlant from "../../ProducePlant";
import UpgradeState from "../../upgrades/UpgradeState";

export default class MungBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'A staple Plant in some regions where other protein sources are scarce.',
    ];

    upgrades: UpgradeState[] = [
        new UpgradeState('Wider Leaves', {'Sky Bean': 1}),
        new UpgradeState('Increased Bud Sites', {'Sky Bean': 2}),
        new UpgradeState('Stem Strength', {'Sky Bean': 3}),
    ];

    public produceBean: BeanType = 'Mung Bean';
    public baseProduceAmount = 10;
    public baseProduceTime = 110;
    public baseStorage = 50;

}