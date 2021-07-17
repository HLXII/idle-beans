import GrowthPlant from "../GrowthPlant";
import Growth from "../growths/Growth";
import DefaultRequirement from '../growths/DefaultRequirement';
import { NearContainsRequirement } from "../growths/plot/PlotRequirements";
import UpgradeState from "../upgrades/UpgradeState";

export default class BeanVine extends GrowthPlant {

    baseDescription = [
        'A more robust Bean growth.',
    ];

    upgrades: UpgradeState[] = [
        new UpgradeState('Root Depth', {'Sky Bean': 1}),
        new UpgradeState('Root Hairs', {'Sky Bean': 2}),
    ];

    public baseGrowthTime: number = 300;
    public growths: Growth[] = [
        new Growth('Bean Stalk', new NearContainsRequirement({plant: 'Bean Vine', amount: 3})),
        /*
        new Growth('Lentil Vine', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('Lentil'),
                // TODO: Figure out growth requirement
            ]
        )),
        */
        new Growth('Peanut Vine', new DefaultRequirement()),
    ];

}