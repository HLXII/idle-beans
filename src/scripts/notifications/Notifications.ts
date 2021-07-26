import { Features } from "@/Features";
import { SaveData, IgtFeature } from "incremental-game-template";
import { BeanType } from "../bean/BeanList";
import Beans from "../bean/Beans";
import { PlantType } from "../plant/PlantList";
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