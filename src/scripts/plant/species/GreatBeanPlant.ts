import { GameText } from "@/scripts/controls/GameText";
import Plant from "../Plant";
import { PlantUpgradeId } from "../upgrades/PlantUpgrades";


export default class GreatBeanPlant extends Plant {

    description: GameText[] = [
        'TODO: Not sure if this si a real plant.',
    ];

    upgrades: PlantUpgradeId[] = [
        'Stronger Roots',
    ];
    
}