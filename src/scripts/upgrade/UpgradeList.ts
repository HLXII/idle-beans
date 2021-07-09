import Upgrade from "./Upgrade";

/**
 * Internal Upgrades List
 * Used to store all General Upgrades. This isn't typed so that we can pull the keys into UpgradeId
 */
 const InternalUpgrades = {
    '7x7 Plains': new Upgrade('7x7 Plains', 'Increase Plains Farm size to 7x7.', {'Prestige Bean': 10}),
    '9x9 Plains': new Upgrade('9x9 Plains', 'Increase Plains Farm size to 9x9.', {'Prestige Bean': 1000}),
};

/**
 * Type union of all Upgrades
 */
export type UpgradeId = keyof typeof InternalUpgrades;

/**
 * Typeguarded reference to InternalUpgrades
 */
export const UpgradeList: Record<UpgradeId, Upgrade> = InternalUpgrades;