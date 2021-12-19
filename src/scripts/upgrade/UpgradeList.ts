import GameHelper from "../GameHelper";
import { WikiType } from "../wiki/WikiType";
import Upgrade from "./Upgrade";
import { UpgradeId } from "./UpgradeId";

/**
 * Upgrade Icon Images
 */
 export const UpgradeImages = GameHelper.importImages(require.context('/src/assets/images/upgrades/', false, /\.(png|jpe?g|svg)$/));


/**
 * Upgrades List
 */
 export const UpgradeList: Record<UpgradeId, Upgrade> = {
    [UpgradeId.PlainsSize1]: new Upgrade(UpgradeId.PlainsSize1, 'Increase Plains Farm size to 7x7.', {'Sky Bean': 10}, [UpgradeId.PlainsSize2]),
    [UpgradeId.PlainsSize2]: new Upgrade(UpgradeId.PlainsSize2, 'Increase Plains Farm size to 9x9.', {'Sky Bean': 1000}),

    [UpgradeId.BudSpeed1]: new Upgrade(UpgradeId.BudSpeed1, ['Decrease ', {text: 'Bean Bud', type: WikiType.Plant, id: 'Bean Bud'}, ' growth time by 50%.'], {'Sky Bean': 1}, [UpgradeId.BudSpeed2, UpgradeId.SproutSpeed1]),
    [UpgradeId.BudSpeed2]: new Upgrade(UpgradeId.BudSpeed2, 'Decrease Bean Bud growth time by 50%.', {'Sky Bean': 5}, [UpgradeId.PlainsSize1]),

    [UpgradeId.SproutSpeed1]: new Upgrade(UpgradeId.SproutSpeed1, 'Decrease Bean Sprout growth time by 50%.', {'Sky Bean': 4}, [UpgradeId.SproutSpeed2]),
    [UpgradeId.SproutSpeed2]: new Upgrade(UpgradeId.SproutSpeed2, 'Decrease Bean Sprout growth time by 50%.', {'Sky Bean': 8}),

};