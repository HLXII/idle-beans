import { GameText, LinkType } from "@/scripts/controls/GameText";
import GrowthPlant from "../GrowthPlant";
import AnyGrowthRequirement from "../growths/AnyGrowthRequirement";
import DefaultRequirement from "../growths/DefaultRequirement";
import Growth from "../growths/Growth";
import OriginBeanRequirement from "../growths/OriginBeanRequirement";
import { OrthoContainsRequirement } from "../growths/plot/PlotRequirements";
import { PlantUpgradeId } from "../upgrades/PlantUpgrades";

export default class YellowBeanSprout extends GrowthPlant {

    get description(): GameText[] {
        return [
            'An uncommon yellow variant of the ',
            {text: 'Bean Sprout', type: LinkType.Plant, id: 'Bean Sprout'},
            '.',
        ];
    }

    upgrades: PlantUpgradeId[] = [
        'Stronger Roots',
    ];

    public growthTime: number = 12000;
    public growths: Growth[] = [
        new Growth('Red Bean Plant', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('Red Bean'),
                // TODO: Create requirement
            ]
        )),
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
