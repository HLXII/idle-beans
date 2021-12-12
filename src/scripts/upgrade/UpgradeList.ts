import Upgrade from "./Upgrade";
import { UpgradeId } from "./UpgradeId";

/**
 * Internal Upgrades List
 * Used to store all General Upgrades. This isn't typed so that we can pull the keys into UpgradeId
 */
 export const UpgradeList: Record<UpgradeId, Upgrade> = {
    [UpgradeId.PlainsSize1]: new Upgrade(UpgradeId.PlainsSize1, 'Increase Plains Farm size to 7x7.', {'Sky Bean': 10}, [UpgradeId.PlainsSize2]),
    [UpgradeId.PlainsSize2]: new Upgrade(UpgradeId.PlainsSize2, 'Increase Plains Farm size to 9x9.', {'Sky Bean': 1000}),
};