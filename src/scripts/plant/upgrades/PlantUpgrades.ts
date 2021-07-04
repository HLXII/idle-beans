import AbstractUpgrade from "./AbstractUpgrade";
import MultiplierUpgrade from "./MultiplierUpgrade";
import { PlantEffectId } from "./PlantEffectId";

/**
 * Internal Upgrades List
 * Used to store all Plant Upgrades. This isn't typed so that we can pull the keys into PlantUpgradeId
 */
 const InternalPlantUpgrades = {
    'Stronger Roots': new MultiplierUpgrade('Stronger Roots', 'Cuts growth time in half.', {'Prestige Bean': 1}, PlantEffectId.GrowthTime, 0.5),
    'Wider Leaves': new MultiplierUpgrade('Wider Leaves', 'Beans grow in half the time.', {'Prestige Bean': 1}, PlantEffectId.RipeTime, 0.5),
};

/**
 * Type union of all Plants
 */
export type PlantUpgradeId = keyof typeof InternalPlantUpgrades;

/**
 * Typeguarded reference to InternalPlantUpgrades
 */
export const PlantUpgrades: Record<PlantUpgradeId, AbstractUpgrade> = InternalPlantUpgrades;