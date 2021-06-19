import GameHelper from '../GameHelper';
import Bean from './Bean';
import PlantableBean from './PlantableBean';

/**
 * Internal Bean List
 * Used to store all Bean data. This isn't typed so that we can pull the keys into BeanType
 */
const InternalBeanList = {
    'Bean': new PlantableBean('Bean', undefined, { unlocked: true, amount: 1 }),
    'Green Bean': new PlantableBean('Green Bean'),
    'Red Bean': new PlantableBean('Red Bean'),
    'Yellow Bean': new PlantableBean('Yellow Bean'),
    'Orange Bean': new PlantableBean('Orange Bean'),
    'White Bean': new PlantableBean('White Bean'),
    'Black Bean': new PlantableBean('Black Bean'),
    'Blue Bean': new PlantableBean('Blue Bean'),
    'Indigo Bean': new PlantableBean('Indigo Bean'),
    'Purple Bean': new PlantableBean('Purple Bean'),
    'Rainbow Bean': new PlantableBean('Rainbow Bean'),
    'Black-eyed Pea': new PlantableBean('Black-eyed Pea'),
    'Adzuki Bean': new PlantableBean('Adzuki Bean'),
    'Chickpea': new PlantableBean('Chickpea'),
    'Soy Bean': new PlantableBean('Soy Bean'),
    'Peanut': new PlantableBean('Peanut'),
    'Lentil': new PlantableBean('Lentil'),
    'Mung Bean': new PlantableBean('Mung Bean'),
    'Pea': new PlantableBean('Pea'),
    'Coffee Bean': new PlantableBean('Coffee Bean'),
    'Cocoa Bean': new PlantableBean('Cocoa Bean'),
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
