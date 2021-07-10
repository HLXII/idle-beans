import GrowthPlant from "../GrowthPlant";
import Growth from "../growths/Growth";
import DefaultRequirement from '../growths/DefaultRequirement';
import AnyGrowthRequirement from '../growths/AnyGrowthRequirement';
import OriginBeanRequirement from '../growths/OriginBeanRequirement';
import { DiagContainsRequirement } from "../growths/plot/PlotRequirements";
import UpgradeState from "../upgrades/UpgradeState";

export default class BeanBud extends GrowthPlant {

    baseDescription = [
        'Just a Bean in the ground.'
    ];
    
    upgrades: UpgradeState[] = [
        new UpgradeState('Root Depth', {'Sky Bean': 1}),
        new UpgradeState('Root Hairs', {'Sky Bean': 2}),
    ];

    public baseGrowthTime: number = 16;
    public growths: Growth[] = [
        new Growth('Bean Vine', new DiagContainsRequirement({plant: 'Bean Plant', amount: 3})),
        new Growth('Blue Bean Sprout', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement(['Blue Bean', 'Indigo Bean', 'Purple Bean']),
                // TODO: Additional logic to initially morph
            ]
        )),
        new Growth('Yellow Bean Sprout', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement(['Yellow Bean', 'Orange Bean', 'Red Bean']),
                new DiagContainsRequirement({plant: 'Bean Plant', amount: 2}),
            ]
        )),
        new Growth('Bean Sprout', new DefaultRequirement()),
    ];

}