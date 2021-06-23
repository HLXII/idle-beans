import Plant from "../Plant";
import { PlantUpgradeId } from "../upgrades/PlantUpgrades";


export default class GreatBeanPlant extends Plant {
    upgrades: PlantUpgradeId[] = [
        'Stronger Roots',
    ];
    
}