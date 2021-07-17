import GrowthPlant from "../../GrowthPlant";
import DefaultRequirement from "../../growths/DefaultRequirement";
import Growth from "../../growths/Growth";
import UpgradeState from "../../upgrades/UpgradeState";

export default class LegumaBud extends GrowthPlant {

    baseDescription = [
        'A small growth that is producing minor amounts of ',
        'Leguma', // TODO: Create Wiki link
        '.',
    ];
    
    upgrades: UpgradeState[] = [
        new UpgradeState('Root Depth', {'Sky Bean': 1}),
        new UpgradeState('Root Hairs', {'Sky Bean': 2}),
    ];

    public baseGrowthTime: number = 16;
    public growths: Growth[] = [
        new Growth('Lesser Leguma Plant', new DefaultRequirement()),
    ];

}