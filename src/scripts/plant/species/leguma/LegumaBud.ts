import GrowthPlant from "../../GrowthPlant";
import DefaultRequirement from "../../growths/DefaultRequirement";
import Growth from "../../growths/Growth";

export default class LegumaBud extends GrowthPlant {

    baseDescription = [
        'A small growth that is producing minor amounts of ',
        'Leguma', // TODO: Create Wiki link
        '.',
    ];

    public baseGrowthTime: number = 16;
    public growths: Growth[] = [
        new Growth('Lesser Leguma Plant', new DefaultRequirement()),
    ];

}