import { Features } from "@/Features";
import { BeanType } from "../bean/BeanList";
import { GameText } from "../controls/GameText";
import AbstractFarm from "../farm/AbstractFarm";
import Farms from "../farm/Farms";
import PlantState from "../plant/PlantState";
import BeanStalkState from "../plant/species/BeanStalkState";
import Prestige from "./Prestige";

export default class BeanStalkPrestige extends Prestige {
    
    private farms: Farms;

    /**Height of Bean Stalk required to prestige */
    private heightRequirement = 6;

    constructor(features: Features) {
        super(features);
        this.farms = features.farms;
    }

    /**
     * Retrieves the highest Bean Stalk if one exists
     */
    get highestBeanStalk(): BeanStalkState | undefined {
        let beanStalk: BeanStalkState | undefined = undefined;
        Object.values(this.farms.farms).forEach((farm: AbstractFarm) => {
            farm.plants.forEach((plant: PlantState | undefined) => {
                if (!plant) {
                    return;
                }
                if (plant.data.name !== 'Bean Stalk') {
                    return;
                }
                const newBeanStalk = plant as BeanStalkState;
                if (!beanStalk) {
                    beanStalk = newBeanStalk;
                } else if (beanStalk.height < newBeanStalk.height) {
                    beanStalk = newBeanStalk;
                }
            });
        });
        return beanStalk;
    }

    name: string = 'Conquer the Heavens';

    get description(): GameText[] {
        return [
            'Grow a Bean Stalk high enough to climb into the heavens.',
        ];
    }

    get visible(): boolean {
        // Finding any Bean Stalks
        return Object.values(this.farms.farms).some((farm: AbstractFarm) => {
            return farm.plants.some((plant: PlantState | undefined) => {
                if (!plant) {
                    return false;
                }
                return (plant.data.name === 'Bean Stalk');
            });
        })
    }

    get canPrestige(): boolean {
        const beanStalk = this.highestBeanStalk;
        if (!beanStalk) {
            return false;
        }
        return beanStalk.height >= this.heightRequirement;
    }

    get reward(): number {
        return 1;
    }
    
    label: string = 'Highest Bean Stalk:';

    get percent(): number {
        return Math.min(1, (this.highestBeanStalk?.height || 0) / this.heightRequirement);
    }

    get text(): string {
        return `${this.highestBeanStalk?.height}/6`;
    }
    
}

export const BeanStalkCost: Record<BeanType, number> = {
    'Bean':             1,
    'Green Bean':       2,
    'Red Bean':         2,
    'Yellow Bean':      2,
    'Orange Bean':      2,
    'White Bean':       3,
    'Black Bean':       3,
    'Blue Bean':        3,
    'Indigo Bean':      4,
    'Purple Bean':      4,
    'Rainbow Bean':     5,
    'Black-eyed Pea':   2,
    'Adzuki Bean':      2,
    'Chickpea':         3,
    'Soy Bean':         4,
    'Peanut':           2,
    'Lentil':           2,
    'Mung Bean':        4,
    'Pea':              3,
    'Coffee Bean':      4,
    'Cocoa Bean':       5,
}