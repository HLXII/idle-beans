import { LinkType } from "@/scripts/controls/GameText";
import GrowthPlant from "../GrowthPlant";
import AnyGrowthRequirement from "../growths/AnyGrowthRequirement";
import DefaultRequirement from "../growths/DefaultRequirement";
import Growth from "../growths/Growth";
import OriginBeanRequirement from "../growths/OriginBeanRequirement";
import { NearContainsRequirement, OrthoContainsRequirement } from "../growths/plot/PlotRequirements";
import UpgradeState from "../upgrades/UpgradeState";

export default class YellowBeanSprout extends GrowthPlant {

    baseDescription = [
        'An uncommon yellow variant of the ',
        {text: 'Bean Sprout', type: LinkType.Plant, id: 'Bean Sprout'},
        '.',
    ];

    upgrades: UpgradeState[] = [
        new UpgradeState('Root Depth', {'Sky Bean': 1}),
        new UpgradeState('Root Hairs', {'Sky Bean': 2}),
    ];
    
    public baseGrowthTime: number = 120;
    public growths: Growth[] = [
        new Growth('Red Bean Plant', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('Red Bean'),
                // TODO: Create requirement
            ]
        )),
        new Growth('Soy Bean Plant', new NearContainsRequirement([
            { plant: 'Yellow Bean Plant', amount: 2},
            'Orange Bean Plant',
        ])),
        new Growth('Orange Bean Plant', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('Orange Bean'),
                new OrthoContainsRequirement(
                    [
                        'Yellow Bean Plant',
                    ]
                )
            ]
        )),
        new Growth('Yellow Bean Plant', new DefaultRequirement()),
    ];
}
