import Plant from './Plant';
import BeanBud from './species/BeanBud';
import BeanSprout from './species/BeanSprout';
import BeanPlant from './species/BeanPlant';
import YellowBeanSprout from './species/YellowBeanSprout';
import BlueBeanSprout from './species/BlueBeanSprout';

/**
 * Internal Plant List
 * Used to store all Plant data. This isn't typed so that we can pull the keys into PlantType
 */
const InternalPlantList = {
    'Bean Bud': new BeanBud('Bean Bud'),
    'Bean Sprout': new BeanSprout('Bean Sprout'),
    'Bean Plant': new BeanPlant('Bean Plant', 'Bean'),
    'Green Bean Plant': new BeanPlant('Green Bean Plant', 'Green Bean'),
    'Yellow Bean Sprout': new YellowBeanSprout('Yellow Bean Sprout'),
    'Yellow Bean Plant': new BeanPlant('Yellow Bean Plant', 'Yellow Bean'),
    'Orange Bean Plant': new BeanPlant('Orange Bean Plant', 'Orange Bean'),
    'Red Bean Plant': new BeanPlant('Red Bean Plant', 'Red Bean'),
    'Blue Bean Sprout': new BlueBeanSprout('Blue Bean Sprout'),
    'Blue Bean Plant': new BeanPlant('Blue Bean Plant', 'Blue Bean'),
    'Indigo Bean Plant': new BeanPlant('Indigo Bean Plant', 'Indigo Bean'),
    'Purple Bean Plant': new BeanPlant('Purple Bean Plant', 'Purple Bean'),
    'White Bean Plant': new BeanPlant('White Bean Plant', 'White Bean'),
    'Black Bean Plant': new BeanPlant('Black Bean Plant', 'Black Bean'),
    'Rainbow Bean Plant': new BeanPlant('Rainbow Bean Plant', 'Rainbow Bean'),
    'Bean Vine': new Plant('Bean Vine'),
    'Peanut Vine': new Plant('Peanut Vine'),
    'Bean Bush': new Plant('Bean Bush'),
};

/**
 * Type union of all Plants
 */
export type PlantType = keyof typeof InternalPlantList;

/**
 * Typeguarded reference to InternalPlantList
 */
export const PlantList: Record<PlantType, Plant> = InternalPlantList;