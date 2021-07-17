import Plant from './Plant';
import BeanBud from './species/BeanBud';
import BeanSprout from './species/BeanSprout';
import BeanPlant from './species/beanplants/BeanPlant';
import YellowBeanSprout from './species/YellowBeanSprout';
import BlueBeanSprout from './species/BlueBeanSprout';
import BeanVine from './species/BeanVine';
import BeanStalk from './species/BeanStalk';
import GreenBeanPlant from './species/beanplants/GreenBeanPlant';
import RedBeanPlant from './species/beanplants/RedBeanPlant';
import BlackBeanPlant from './species/beanplants/BlackBeanPlant';
import BlueBeanPlant from './species/beanplants/BlueBeanPlant';
import IndigoBeanPlant from './species/beanplants/IndigoBeanPlant';
import OrangeBeanPlant from './species/beanplants/OrangeBeanPlant';
import PurpleBeanPlant from './species/beanplants/PurpleBeanPlant';
import RainbowBeanPlant from './species/beanplants/RainbowBeanPlant';
import WhiteBeanPlant from './species/beanplants/WhiteBeanPlant';
import YellowBeanPlant from './species/beanplants/YellowBeanPlant';
import BeanShoot from './species/foodplants/BeanShoot';
import SoyBeanPlant from './species/foodplants/SoyBeanPlant';
import MungBeanPlant from './species/foodplants/MungBeanPlant';
import PeanutVine from './species/foodplants/PeanutVine';

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
    'Bean Bud':             new BeanBud('Bean Bud',                     PlantCategory.Common, { unlocked: true }),
    'Bean Sprout':          new BeanSprout('Bean Sprout',               PlantCategory.Common),
    'Yellow Bean Sprout':   new YellowBeanSprout('Yellow Bean Sprout',  PlantCategory.Colored),
    'Blue Bean Sprout':     new BlueBeanSprout('Blue Bean Sprout',      PlantCategory.Colored),
    'Bean Plant':           new BeanPlant('Bean Plant',                 PlantCategory.Common), 
    'Green Bean Plant':     new GreenBeanPlant('Green Bean Plant',      PlantCategory.Colored),
    'Yellow Bean Plant':    new YellowBeanPlant('Yellow Bean Plant',    PlantCategory.Colored),
    'Orange Bean Plant':    new OrangeBeanPlant('Orange Bean Plant',    PlantCategory.Colored),
    'Red Bean Plant':       new RedBeanPlant('Red Bean Plant',          PlantCategory.Colored),
    'Blue Bean Plant':      new BlueBeanPlant('Blue Bean Plant',        PlantCategory.Colored),
    'Indigo Bean Plant':    new IndigoBeanPlant('Indigo Bean Plant',    PlantCategory.Colored),
    'Purple Bean Plant':    new PurpleBeanPlant('Purple Bean Plant',    PlantCategory.Colored),
    'White Bean Plant':     new WhiteBeanPlant('White Bean Plant',      PlantCategory.Colored),
    'Black Bean Plant':     new BlackBeanPlant('Black Bean Plant',      PlantCategory.Colored),
    'Rainbow Bean Plant':   new RainbowBeanPlant('Rainbow Bean Plant',  PlantCategory.Colored),
    'Bean Shoot':           new BeanShoot('Bean Shoot',                 PlantCategory.Common),
    'Soy Bean Plant':       new SoyBeanPlant('Soy Bean Plant',          PlantCategory.Food),
    'Mung Bean Plant':      new MungBeanPlant('Mung Bean Plant',        PlantCategory.Food), 
    //'Black-eyed Pea Plant': new BeanPlant('Black-eyed Pea Plant',       PlantCategory.Food), 
    //'Adzuki Bean Plant':    new BeanPlant('Adzuki Bean Plant',          PlantCategory.Food), 
    //'Chickpea Plant':       new BeanPlant('Chickpea Plant',             PlantCategory.Food), 
    'Peanut Vine':          new PeanutVine('Peanut Vine',               PlantCategory.Food), 
    //'Lentil Vine':          new BeanPlant('Lentil Vine',                PlantCategory.Food), 
    //'Pea Plant':            new BeanPlant('Pea Plant',                  PlantCategory.Food), 
    //'Coffee Tree':          new BeanPlant('Coffee Tree',                PlantCategory.Food), 
    //'Cacao Tree':           new BeanPlant('Cacao Tree',                 PlantCategory.Food), 
    'Bean Vine':            new BeanVine('Bean Vine',                   PlantCategory.Common), 
    'Bean Stalk':           new BeanStalk('Bean Stalk',                 PlantCategory.Common),
    //'Lesser Leguma Plant':  new LesserLegumaPlant
};

/**
 * Type union of all Plants
 */
export type PlantType = keyof typeof InternalPlantList;

/**
 * Typeguarded reference to InternalPlantList
 */
export const PlantList: Record<PlantType, Plant> = InternalPlantList;