import GrowthPlant from "../GrowthPlant";
import GrowthPlantState from "../GrowthPlantState";
import AnyGrowthRequirement from "../growths/AnyGrowthRequirement";
import DefaultRequirement from "../growths/DefaultRequirement";
import Growth from "../growths/Growth";
import OriginBeanRequirement from "../growths/OriginBeanRequirement";

export default class YellowBeanSprout extends GrowthPlant {

    public growthTime: number = 12000;
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