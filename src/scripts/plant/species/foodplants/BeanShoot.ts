import GrowthPlant from "../../GrowthPlant";
import DefaultRequirement from "../../growths/DefaultRequirement";
import Growth from "../../growths/Growth";
import { NearContainsRequirement } from "../../growths/plot/PlotRequirements";

export default class BeanShoot extends GrowthPlant {

    baseDescription = [
        'A taller, more fibrous growth stage of a Bean.'
    ];

    public baseGrowthTime: number = 32;
    public growths: Growth[] = [
        new Growth('Bean Vine', new NearContainsRequirement({plant: 'Bean Shoot', amount: 2})),
        new Growth('Soy Bean Plant', new DefaultRequirement()),
    ];

}