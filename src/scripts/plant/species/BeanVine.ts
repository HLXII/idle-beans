import GrowthPlant from "../GrowthPlant";
import Growth from "../growths/Growth";
import DefaultRequirement from '../growths/DefaultRequirement';
import { NearContainsRequirement } from "../growths/plot/PlotRequirements";

export default class BeanVine extends GrowthPlant {

    baseDescription = [
        'A more robust Bean growth.',
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