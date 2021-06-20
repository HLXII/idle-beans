import GameHelper from '../GameHelper';
import Bean from './Bean';
import PlantableBean from './PlantableBean';

/**
 * Internal Bean List
 * Used to store all Bean data. This isn't typed so that we can pull the keys into BeanType
 */
const InternalBeanList = {
    'Bean': new PlantableBean('Bean', 'The quintessential Bean.', 'Bean Bud', { unlocked: true, amount: 1 }),
    'Green Bean': new PlantableBean('Green Bean', 'A greener variety of Bean. Goes great in soups.'),
    'Red Bean': new PlantableBean('Red Bean', 'It\'s vibrant color lends itself to stews.'),
    'Yellow Bean': new PlantableBean('Yellow Bean', 'A more pale Bean variety. Ideally should be harvested young.'),
    'Orange Bean': new PlantableBean('Orange Bean', 'A mixed breed Bean that has a more savory quality.'),
    'White Bean': new PlantableBean('White Bean', 'Some value the pure color of this Bean variety.'),
    'Black Bean': new PlantableBean('Black Bean', 'The dark coloration of this Bean leads to some interesting properties.'),
    'Blue Bean': new PlantableBean('Blue Bean', 'An interesting mutation, how\'d you manage this?'),
    'Indigo Bean': new PlantableBean('Indigo Bean', 'The deeper shade of Indigo is caused by unique pigments to this Bean.'),
    'Purple Bean': new PlantableBean('Purple Bean', 'The purple hue of this bean lead it to be prized in some ancient cultures.'),
    'Rainbow Bean': new PlantableBean('Rainbow Bean', 'The cellular structure of this Bean has striations of various colored Beans.'),
    'Black-eyed Pea': new PlantableBean('Black-eyed Pea', 'TODO'),
    'Adzuki Bean': new PlantableBean('Adzuki Bean', 'TODO'),
    'Chickpea': new PlantableBean('Chickpea', 'TODO'),
    'Soy Bean': new PlantableBean('Soy Bean', 'TODO'),
    'Peanut': new PlantableBean('Peanut', 'TODO'),
    'Lentil': new PlantableBean('Lentil', 'TODO'),
    'Mung Bean': new PlantableBean('Mung Bean', 'TODO'),
    'Pea': new PlantableBean('Pea', 'TODO'),
    'Coffee Bean': new PlantableBean('Coffee Bean', 'TODO'),
    'Cocoa Bean': new PlantableBean('Cocoa Bean', 'TODO'),
};

/**
 * Type union of all Beans
 */
export type BeanType = keyof typeof InternalBeanList;

/**
 * Typeguarded reference to InternalBeanList
 */
export const BeanList: Record<BeanType, Bean> = InternalBeanList;

export const BeanImages = GameHelper.importImages(require.context('/src/assets/images/beans/', false, /\.(png|jpe?g|svg)$/));
