import GrowthPlantState from './GrowthPlantState';
import Plant from './Plant';
import { PlantType } from './PlantList';
import Growth from './growths/Growth';
import { App } from '@/App';
import ModifierUpgrade from './upgrades/ModifierUpgrade';
import { PlantEffectId } from './upgrades/PlantEffectId';
import { GameText } from '../controls/GameText';

export interface GrowthCheck {
    plant: PlantType;
    time: number;
}

export default abstract class GrowthPlant extends Plant {
    public static state = GrowthPlantState;

    /**
     * Base age (s) in which the plant will grow
     */
    public abstract baseGrowthTime: number;

    /**
     * Age (s) in which the Plant will grow, taking into account modifiers
     * If the GrowthPlantState is given, will also take into account status effects
     * @param state The GrowthPlantState
     * @returns The Age (s) in which the Plant will grow.
     */
    growthTime(state?: GrowthPlantState): number {
        let growthTime = this.baseGrowthTime;

        // Handle Upgrades
        this.upgrades.filter((upgradeState) => upgradeState.purchased).map((upgradeState) => {
            return App.game.features.plants.upgrades[upgradeState.id];
        }).forEach((upgrade) => {
            if (upgrade instanceof ModifierUpgrade) {
                growthTime = upgrade.applyEffect(growthTime, PlantEffectId.GrowthTime);
            }
        });
        // TODO: Consider other upgrade types?

        // Handle Statuses
        // TODO:

        return growthTime;
    }

    get description(): GameText[] {
        return [
            ...this.baseDescription,
            '<br>',
            `Grows in ${this.growthTime()} seconds.`, 
        ];
    }


    /**
     * List of possible growth requirements.
     * Will be check in order of appearance (first requirement prioritized)
     * Last requirement must be the default growth, and always return true
     */
    public abstract growths: Growth[];

    /**
     * Handles checking growth requirements
     * @param state The current plant state
     */
    growthPlant(state: GrowthPlantState): PlantType {

        for (const growth of this.growths) {
            if (growth.req.growthCheck(state)) {
                return growth.plant;
            }
        }

        // Sanity check. Growth requirements should always return a value
        console.error('Error - Could not find growth requirement', state);
        return 'Bean Bud';
    }

}