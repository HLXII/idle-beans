import { GameText, LinkType } from "@/scripts/controls/GameText";
import GrowthPlant from "../GrowthPlant";
import AnyGrowthRequirement from "../growths/AnyGrowthRequirement";
import DefaultRequirement from "../growths/DefaultRequirement";
import Growth from "../growths/Growth";
import OriginBeanRequirement from "../growths/OriginBeanRequirement";
import { PlantUpgradeId } from "../upgrades/PlantUpgrades";

export default class BlueBeanSprout extends GrowthPlant {

    get description(): GameText[] {
        return [
            'A rare blue variant of the ',
            {text: 'Bean Sprout', type: LinkType.Plant, id: 'Bean Sprout'},
            '.',
        ];
    }

    upgrades: PlantUpgradeId[] = [
        'Stronger Roots',
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