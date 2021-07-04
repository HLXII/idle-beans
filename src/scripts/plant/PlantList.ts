import Plant from './Plant';
import BeanBud from './species/BeanBud';
import BeanSprout from './species/BeanSprout';
import BeanPlant from './species/BeanPlant';
import YellowBeanSprout from './species/YellowBeanSprout';
import BlueBeanSprout from './species/BlueBeanSprout';
import BeanVine from './species/BeanVine';
import BeanStalk from './species/BeanStalk';

export enum PlantCategory {
    'Common' = 0,
    'Colored',
    'Food',
}

/**
 * Internal Plant List
 * Used to store all Plant data. This isn't typed so that we can pull the keys into PlantType
 */
const InternalPlantList = {
    'Bean Bud':             new BeanBud('Bean Bud',                     1,      PlantCategory.Common, { unlocked: true }),
    'Bean Sprout':          new BeanSprout('Bean Sprout',               2,      PlantCategory.Common),
    'Yellow Bean Sprout':   new YellowBeanSprout('Yellow Bean Sprout',  4,      PlantCategory.Colored),
    'Blue Bean Sprout':     new BlueBeanSprout('Blue Bean Sprout',      10,     PlantCategory.Colored),
    'Bean Plant':           new BeanPlant('Bean Plant',                 3,      PlantCategory.Common, 'Bean'),
    'Green Bean Plant':     new BeanPlant('Green Bean Plant',           4,      PlantCategory.Colored, 'Green Bean'),
    'Yellow Bean Plant':    new BeanPlant('Yellow Bean Plant',          5,      PlantCategory.Colored, 'Yellow Bean'),
    'Orange Bean Plant':    new BeanPlant('Orange Bean Plant',          6,      PlantCategory.Colored, 'Orange Bean'),
    'Red Bean Plant':       new BeanPlant('Red Bean Plant',             7,      PlantCategory.Colored, 'Red Bean'),
    'Blue Bean Plant':      new BeanPlant('Blue Bean Plant',            15,     PlantCategory.Colored, 'Blue Bean'),
    'Indigo Bean Plant':    new BeanPlant('Indigo Bean Plant',          20,     PlantCategory.Colored, 'Indigo Bean'),
    'Purple Bean Plant':    new BeanPlant('Purple Bean Plant',          25,     PlantCategory.Colored, 'Purple Bean'),
    'White Bean Plant':     new BeanPlant('White Bean Plant',           30,     PlantCategory.Colored, 'White Bean'),
    'Black Bean Plant':     new BeanPlant('Black Bean Plant',           40,     PlantCategory.Colored, 'Black Bean'),
    'Rainbow Bean Plant':   new BeanPlant('Rainbow Bean Plant',         50,     PlantCategory.Colored, 'Rainbow Bean'),
    'Bean Vine':            new BeanVine('Bean Vine',                   8,      PlantCategory.Common), 
    'Bean Stalk':           new BeanStalk('Bean Stalk',                 10,     PlantCategory.Common),
};

/**
 * Type union of all Plants
 */
export type PlantType = keyof typeof InternalPlantList;

/**
 * Typeguarded reference to InternalPlantList
 */
export const PlantList: Record<PlantType, Plant> = InternalPlantList;