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
    'Bean Bud': new BeanBud('Bean Bud', PlantCategory.Common),
    'Bean Sprout': new BeanSprout('Bean Sprout', PlantCategory.Common),
    'Bean Plant': new BeanPlant('Bean Plant', PlantCategory.Common, 'Bean'),
    'Green Bean Plant': new BeanPlant('Green Bean Plant', PlantCategory.Colored, 'Green Bean'),
    'Yellow Bean Sprout': new YellowBeanSprout('Yellow Bean Sprout', PlantCategory.Colored),
    'Yellow Bean Plant': new BeanPlant('Yellow Bean Plant', PlantCategory.Colored, 'Yellow Bean'),
    'Orange Bean Plant': new BeanPlant('Orange Bean Plant', PlantCategory.Colored, 'Orange Bean'),
    'Red Bean Plant': new BeanPlant('Red Bean Plant', PlantCategory.Colored, 'Red Bean'),
    'Blue Bean Sprout': new BlueBeanSprout('Blue Bean Sprout', PlantCategory.Colored),
    'Blue Bean Plant': new BeanPlant('Blue Bean Plant', PlantCategory.Colored, 'Blue Bean'),
    'Indigo Bean Plant': new BeanPlant('Indigo Bean Plant', PlantCategory.Colored, 'Indigo Bean'),
    'Purple Bean Plant': new BeanPlant('Purple Bean Plant', PlantCategory.Colored, 'Purple Bean'),
    'White Bean Plant': new BeanPlant('White Bean Plant', PlantCategory.Colored, 'White Bean'),
    'Black Bean Plant': new BeanPlant('Black Bean Plant', PlantCategory.Colored, 'Black Bean'),
    'Rainbow Bean Plant': new BeanPlant('Rainbow Bean Plant', PlantCategory.Colored, 'Rainbow Bean'),
    'Bean Vine': new BeanVine('Bean Vine', PlantCategory.Common),
    'Bean Stalk': new BeanStalk('Bean Stalk', PlantCategory.Common),
};

/**
 * Type union of all Plants
 */
export type PlantType = keyof typeof InternalPlantList;

/**
 * Typeguarded reference to InternalPlantList
 */
export const PlantList: Record<PlantType, Plant> = InternalPlantList;