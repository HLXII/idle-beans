import { Features } from "@/Features";
import { SaveData, IgtFeature } from "incremental-game-template";
import { BeanCategory, BeanType } from "../bean/BeanList";
import Beans from "../bean/Beans";
import { PlantCategory, PlantType } from "../plant/PlantList";
import Plants from "../plant/Plants";


export interface NotificationsSaveData extends SaveData {
    beanNotification: {[key in string]: boolean};
    plantNotification: {[key in string]: boolean};
}

export default class Notifications extends IgtFeature {

    /**Internal reference to Features */
    private beans!: Beans;
    private plants!: Plants;

    public beanNotification!: {[key in BeanType]: boolean};
    public plantNotification!: {[key in PlantType]: boolean};

    // TODO: Achievement Notifications
    // TODO: Prestige Notifications
    // TODO: Push/popup notifications?

    constructor() {
        super('notifications');
    }

    initialize(features: Features): void {
        this.beans = features.beans;
        this.plants = features.plants;

        const beanNotifyInternal: {[key: string]: boolean} = {};
        Object.keys(this.beans.list).forEach((key) => { beanNotifyInternal[key] = false; });
        this.beanNotification = beanNotifyInternal as {[key in BeanType]: boolean};

        const plantNotifyInternal: {[key: string]: boolean} = {};
        Object.keys(this.plants.list).forEach((key) => { plantNotifyInternal[key] = false; });
        this.plantNotification = plantNotifyInternal as {[key in PlantType]: boolean};
    }
    canAccess(): boolean {
        return true;
    }

    //#region Wiki Notifications

    get hasWikiNotification(): boolean {
        return this.hasBeansNotification || this.hasPlantsNotification;
    }

    get hasBeansNotification(): boolean {
        return Object.values(this.beans.list).filter((bean) => bean.unlocked).some((bean) => !this.beanNotification[bean.name as BeanType]);
    }

    hasBeanCatNotification(cat: BeanCategory): boolean {
        return Object.values(this.beans.list)
            .filter((bean) => bean.unlocked)
            .filter((bean) => bean.category === cat)
            .some((bean) => !this.beanNotification[bean.name as BeanType]);
    }

    hasBeanNotification(bean: BeanType): boolean {
        return this.beans.list[bean].unlocked && !this.beanNotification[bean];
    }

    get hasPlantsNotification(): boolean {
        return Object.values(this.plants.list).filter((plant) => plant.unlocked).some((plant) => !this.plantNotification[plant.name as PlantType]);
    }

    hasPlantCatNotification(cat: PlantCategory): boolean {
        return Object.values(this.plants.list)
            .filter((plant) => plant.unlocked)
            .filter((plant) => plant.category === cat)
            .some((plant) => !this.plantNotification[plant.name as PlantType]);
    }

    hasPlantNotification(plant: PlantType): boolean {
        return this.plants.list[plant].unlocked && !this.plantNotification[plant];
    }

    //#endregion

    notify(id: BeanType | PlantType) {
        if (this.beans.list[id as BeanType] !== undefined) {
            this.beanNotification[id as BeanType] = true;
        } else if (this.plants.list[id as PlantType] !== undefined) {
            this.plantNotification[id as PlantType] = true;
        }
    }

    load(data: NotificationsSaveData): void {
        Object.entries(data.beanNotification).forEach(([bean, notified]) => {
            if (this.beanNotification[bean as BeanType] !== undefined) {
                this.beanNotification[bean as BeanType] = notified;
            }
        });
        Object.entries(data.plantNotification).forEach(([plant, notified]) => {
            if (this.plantNotification[plant as PlantType] !== undefined) {
                this.plantNotification[plant as PlantType] = notified;
            }
        });
    }
    save(): NotificationsSaveData {
        const beanNotification: {[key in string]: boolean} = {};
        Object.entries(this.beanNotification).forEach(([bean, notified]) => { beanNotification[bean] = notified; });

        const plantNotification: {[key in string]: boolean} = {};
        Object.entries(this.plantNotification).forEach(([plant, notified]) => { plantNotification[plant] = notified; });
        
        return {
            beanNotification: beanNotification,
            plantNotification: plantNotification,
        };
    }
}