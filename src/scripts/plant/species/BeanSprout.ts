import GrowthPlant from "../GrowthPlant";
import AnyGrowthRequirement from "../growths/AnyGrowthRequirement";
import DefaultRequirement from "../growths/DefaultRequirement";
import Growth from "../growths/Growth";
import OriginBeanRequirement from "../growths/OriginBeanRequirement";
import NearContainsRequirement from "../growths/plot/NearContainsRequirement";
import OrthoContainsRequirement from "../growths/plot/OrthoContainsRequirement";


export default class BeanSprout extends GrowthPlant {

    public growthTime: number = 10;
    public growths: Growth[] = [
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
        new Growth('Green Bean Plant', new AnyGrowthRequirement(
            [
                new OriginBeanRequirement('Green Bean'),
                new OrthoContainsRequirement('Bean Plant'),
            ]
        )),
        //new Growth('Bean Bush', // TODO: create requirement
        new Growth('Bean Plant', new DefaultRequirement()),
    ];

}