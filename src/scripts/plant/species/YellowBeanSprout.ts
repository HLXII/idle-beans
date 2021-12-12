import { WikiType } from "@/scripts/wiki/WikiType";
import GrowthPlant from "../GrowthPlant";
import AnyGrowthRequirement from "../growths/AnyGrowthRequirement";
import DefaultRequirement from "../growths/DefaultRequirement";
import Growth from "../growths/Growth";
import OriginBeanRequirement from "../growths/OriginBeanRequirement";
import { NearContainsRequirement, OrthoContainsRequirement } from "../growths/plot/PlotRequirements";

export default class YellowBeanSprout extends GrowthPlant {

    baseDescription = [
        'An uncommon yellow variant of the ',
        {text: 'Bean Sprout', type: WikiType.Plant, id: 'Bean Sprout'},
        '.',
    ];
    
    public baseGrowthTime: number = 120;
    public growths: Growth[] = [
        /*
        new Growth('Red Bean Plant', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('Red Bean'),
                // TODO: Create requirement
            ]
        )),
        */
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
