import GrowthPlant from "../GrowthPlant";
import AnyGrowthRequirement from "../growths/AnyGrowthRequirement";
import DefaultRequirement from "../growths/DefaultRequirement";
import Growth from "../growths/Growth";
import OriginBeanRequirement from "../growths/OriginBeanRequirement";
import { NearContainsRequirement, OrthoContainsRequirement } from "../growths/plot/PlotRequirements";
import UpgradeState from "../upgrades/UpgradeState";

export default class BeanSprout extends GrowthPlant {

    baseDescription = [
        'Just a Bean trying to grow.',
    ];

    upgrades: UpgradeState[] = [
        new UpgradeState('Root Depth', {'Sky Bean': 1}),
        new UpgradeState('Root Hairs', {'Sky Bean': 2}),
    ];

    public baseGrowthTime: number = 16;
    public growths: Growth[] = [
        /*
        new Growth('Rainbow Bean Plant', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('Rainbow Bean'),
                new NearContainsRequirement(
                    [
                        'Red Bean Plant',
                        'Orange Bean Plant',
                        'Yellow Bean Plant',
                        'Green Bean Plant',
                        'Blue Bean Plant',
                        'Indigo Bean Plant',
                        'Purple Bean Plant',
                    ]
                )
            ]
        )),
        */
        /*
        new Growth('Black Bean Plant', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('Black Bean'),
                // TODO: Create requirement
            ]
        )),
        new Growth('White Bean Plant', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('White Bean'),
                // TODO: Create requirement
            ]
        )),
        */
        new Growth('Mung Bean Plant', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('Mung Bean'),
                new OrthoContainsRequirement({plant: 'Green Bean Plant', amount: 4}),
            ]
        )),
        new Growth('Green Bean Plant', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('Green Bean'),
                new OrthoContainsRequirement('Bean Plant'),
            ]
        )),
        new Growth('Bean Plant', new DefaultRequirement()),
    ];

}