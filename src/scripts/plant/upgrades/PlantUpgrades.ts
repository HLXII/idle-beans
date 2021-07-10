import PlantUpgrade from "./PlantUpgrade";
import MultiplierUpgrade from "./MultiplierUpgrade";
import { PlantEffectId } from "./PlantEffectId";

/**
 * Internal Upgrades List
 * Used to store all Plant Upgrades. This isn't typed so that we can pull the keys into PlantUpgradeId
 */
 const InternalPlantUpgrades = {
    'Root Depth': new MultiplierUpgrade('Root Depth', 'Increase depth of roots, accessing additional nutrients. Cuts growth time in half.', PlantEffectId.GrowthTime, 0.5),
    'Root Hairs': new MultiplierUpgrade('Root Hairs', 'Additional root hairs provide more surface area for nutrient extraction. Cuts growth time in half.', PlantEffectId.GrowthTime, 0.5, 'Root Depth'),
    'Wider Leaves': new MultiplierUpgrade('Wider Leaves', 'Beans grow in half the time.', PlantEffectId.RipeTime, 0.5),

};

/**
 * Type union of all Plants
 */
export type PlantUpgradeId = keyof typeof InternalPlantUpgrades;

/**
 * Typeguarded reference to InternalPlantUpgrades
 */
export const PlantUpgrades: Record<PlantUpgradeId, PlantUpgrade> = InternalPlantUpgrades;