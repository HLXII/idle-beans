import { BeanType } from "@/scripts/bean/BeanList";
import { GameText } from "@/scripts/controls/GameText";
import ProducePlant from "../../ProducePlant";
import UpgradeState from "../../upgrades/UpgradeState";

export default class PeanutVine extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Grows stalks that bend low towards the soil so the seed pods grow underground.',
    ];

    upgrades: UpgradeState[] = [
        new UpgradeState('Wider Leaves', {'Sky Bean': 1}),
        new UpgradeState('Increased Bud Sites', {'Sky Bean': 2}),
        new UpgradeState('Stem Strength', {'Sky Bean': 3}),
    ];

    public produceBean: BeanType = 'Peanut';
    public baseProduceAmount = 10;
    public baseProduceTime = 110;
    public baseStorage = 50;

}