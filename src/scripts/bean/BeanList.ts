import GameHelper from '../GameHelper';
import { UpgradeId } from '../upgrade/UpgradeId';
import Bean from './Bean';
import PlantableBean from './plantable/PlantableBean';

export enum BeanCategory {
    'Normal' = 0,
    'Colored',
    'Food',
    'Special',
    'Machine',
}

/**
 * Internal Bean List
 * Used to store all Bean data. This isn't typed so that we can pull the keys into BeanType
 */
const InternalBeanList = {
    'Bean': new PlantableBean('Bean', 'The quintessential Bean.', BeanCategory.Normal, UpgradeId.PlainsSize1, 'Bean Bud', undefined, { unlocked: true, amount: 1 }),
    'Green Bean': new PlantableBean('Green Bean', 'A greener variety of Bean. Goes great in soups.', BeanCategory.Colored, UpgradeId.PlainsSize1),
    'Red Bean': new PlantableBean('Red Bean', 'It\'s vibrant color lends itself to stews.', BeanCategory.Colored, UpgradeId.PlainsSize1),
    'Yellow Bean': new PlantableBean('Yellow Bean', 'A more pale Bean variety. Ideally should be harvested young.', BeanCategory.Colored, UpgradeId.PlainsSize1),
    'Orange Bean': new PlantableBean('Orange Bean', 'A mixed breed Bean that has a more savory quality.', BeanCategory.Colored, UpgradeId.PlainsSize1),
    'White Bean': new PlantableBean('White Bean', 'Some value the pure color of this Bean variety.', BeanCategory.Colored, UpgradeId.PlainsSize1),
    'Black Bean': new PlantableBean('Black Bean', 'The dark coloration of this Bean leads to some interesting properties.', BeanCategory.Colored, UpgradeId.PlainsSize1),
    'Blue Bean': new PlantableBean('Blue Bean', 'An interesting mutation, how\'d you manage this?', BeanCategory.Colored, UpgradeId.PlainsSize1),
    'Indigo Bean': new PlantableBean('Indigo Bean', 'The deeper shade of Indigo is caused by unique pigments to this Bean.', BeanCategory.Colored, UpgradeId.PlainsSize1),
    'Purple Bean': new PlantableBean('Purple Bean', 'The purple hue of this bean lead it to be prized in some ancient cultures.', BeanCategory.Colored, UpgradeId.PlainsSize1),
    'Rainbow Bean': new PlantableBean('Rainbow Bean', 'The cellular structure of this Bean has striations of various colored Beans.', BeanCategory.Colored, UpgradeId.PlainsSize1),
    'Soy Bean': new PlantableBean('Soy Bean', 'TODO', BeanCategory.Food, UpgradeId.PlainsSize1),
    'Mung Bean': new PlantableBean('Mung Bean', 'TODO', BeanCategory.Food, UpgradeId.PlainsSize1),
    //'Black-eyed Pea': new PlantableBean('Black-eyed Pea', 'TODO', BeanCategory.Food),
    //'Adzuki Bean': new PlantableBean('Adzuki Bean', 'TODO', BeanCategory.Food),
    //'Chickpea': new PlantableBean('Chickpea', 'TODO', BeanCategory.Food),
    'Peanut': new PlantableBean('Peanut', 'TODO', BeanCategory.Food, UpgradeId.PlainsSize1),
    //'Lentil': new PlantableBean('Lentil', 'TODO', BeanCategory.Food),
    //'Pea': new PlantableBean('Pea', 'TODO', BeanCategory.Food),
    //'Coffee Bean': new PlantableBean('Coffee Bean', 'TODO', BeanCategory.Food),
    //'Cocoa Bean': new PlantableBean('Cocoa Bean', 'TODO', BeanCategory.Food),
    'Sky Bean': new Bean('Sky Bean', 'A Bean of condensed power of the Sky.', BeanCategory.Special, UpgradeId.PlainsSize1),
    'Magic Bean': new PlantableBean('Magic Bean', 'A Bean imbued with magical energy. Worth 1/5th a cow.', BeanCategory.Normal, UpgradeId.PlainsSize1, 'Leguma Bud'),
    //'PCBean': new Bean('PCBean', 'A silicon-based Bean species. Has evolved to conduct electrical signals between its cell walls.', BeanCategory.Machine),
};

/**
 * Type union of all Beans
 */
export type BeanType = keyof typeof InternalBeanList;

/**
 * Typeguarded reference to InternalBeanList
 */
export const BeanList: Record<BeanType, Bean> = InternalBeanList;

/**
 * Bean Icon Images
 */
export const BeanImages = GameHelper.importImages(require.context('/src/assets/images/beans/', false, /\.(png|jpe?g|svg)$/));

/**
 * Type for Bean amounts
 */
export type BeanAmount = {[bean in BeanType]?: number};

/**
 * Value of the Bean when consumed by a Bean Stalk
 */
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
    'Soy Bean':         4,
    'Mung Bean':        4,
    //'Black-eyed Pea':   2,
    //'Adzuki Bean':      2,
    //'Chickpea':         3,
    'Peanut':           2,
    //'Lentil':           2,
    //'Pea':              3,
    //'Coffee Bean':      4,
    //'Cocoa Bean':       5,
    'Sky Bean':         0,
    'Magic Bean':       0,
    //'PCBean':           0,
}