import { Features } from "@/Features";
import { BeanAmount } from "../bean/BeanList";
import { GameText } from "../controls/GameText";
import EntityState from "../entity/EntityState";
import AbstractFarm from "../farm/AbstractFarm";
import Farms from "../farm/Farms";
import BeanStalkState from "../plant/species/BeanStalkState";
import Prestige from "./Prestige";

export default class BeanStalkPrestige extends Prestige {
    
    private farms: Farms;

    /**Height of Bean Stalk required to prestige */
    public static prestigeHeight = 5;

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
            farm.entities.forEach((entity: EntityState | undefined) => {
                if (entity instanceof BeanStalkState) {
                    if (!beanStalk) {
                        beanStalk = entity;
                    } else if (beanStalk.height < entity.height) {
                        beanStalk = entity;
                    }                
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
            return farm.entities.some((entity: EntityState | undefined) => {
                return (entity instanceof BeanStalkState);
            });
        })
    }

    get canPrestige(): boolean {
        const beanStalk = this.highestBeanStalk;
        if (!beanStalk) {
            return false;
        }
        return beanStalk.height >= BeanStalkPrestige.prestigeHeight;
    }

    get reward(): BeanAmount {
        const beanStalk = this.highestBeanStalk;
        
        // No Bean Stalk, default to nothing
        if (!beanStalk) {
            return {};
        }

        const reward = {
            'Sky Bean': beanStalk.height - 4,
        };
        return reward;
    }
    
    label: string = 'Highest Bean Stalk:';

    get percent(): number {
        return Math.min(1, (this.highestBeanStalk?.height || 0) / BeanStalkPrestige.prestigeHeight);
    }

    get text(): string {
        return `${this.highestBeanStalk?.height}/${BeanStalkPrestige.prestigeHeight}`;
    }
    
}