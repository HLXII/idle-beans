import { GameText, LinkType } from "@/scripts/controls/GameText";
import GrowthPlant from "../GrowthPlant";
import AnyGrowthRequirement from "../growths/AnyGrowthRequirement";
import DefaultRequirement from "../growths/DefaultRequirement";
import Growth from "../growths/Growth";
import OriginBeanRequirement from "../growths/OriginBeanRequirement";
import UpgradeState from "../upgrades/UpgradeState";

export default class BlueBeanSprout extends GrowthPlant {

    baseDescription = [
        'A rare blue variant of the ',
        {text: 'Bean Sprout', type: LinkType.Plant, id: 'Bean Sprout'},
        '.',
    ];

    upgrades: UpgradeState[] = [
        new UpgradeState('Stronger Roots', {'Sky Bean': 1}),
    ];

    public baseGrowthTime: number = 3600;
    public growths: Growth[] = [
        new Growth('Purple Bean Plant', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('Purple Bean'),
                // TODO: Create requirement
            ]
        )),
        new Growth('Indigo Bean Plant', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('Indigo Bean'),
                // TODO: Create requirement
            ]
        )),
        new Growth('Blue Bean Plant', new DefaultRequirement()),
    ];
}