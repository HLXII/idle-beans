import { Features } from "@/Features";
import { SaveData, IgtFeature } from "incremental-game-template";
import Bean from "../bean/Bean";
import { BeanType } from "../bean/BeanList";
import Beans from "../bean/Beans";
import GameController, { ModalType, TabType } from "../GameController";
import Notifications from "../notifications/Notifications";
import Plant from "../plant/Plant";
import { SVGData } from "../plant/PlantImages";
import { PlantType } from "../plant/PlantList";
import Plants from "../plant/Plants";

export enum WikiType {
    Bean,
    Plant,
    Farm,
}

export interface WikiEntry {
    type: WikiType;
    category: number;
    visible: boolean;
    icon?: SVGData;
    image?: any;
    elementName: string;
    component: string;
}

export interface WikiSaveData extends SaveData {

}

export default class Wiki extends IgtFeature {

    /**Internal reference to Features */
    private beans!: Beans;
    private plants!: Plants;
    private controller!: GameController;
    private notifications!: Notifications;

    /**Opened Bean */
    public bean: BeanType;
    /**Opened Plant */
    public plant: PlantType;

    constructor() {
        super('wiki');

        this.bean = 'Bean';
        this.plant = 'Bean Bud';
    }

    initialize(features: Features): void {
        this.beans = features.beans;
        this.plants = features.plants;
        this.controller = features.controller;
        this.notifications = features.notifications;
    }
    canAccess(): boolean {
        return true;
    }

    changeBean(beanType: BeanType) {
        this.bean = beanType;

        this.notifications.notify(beanType);
    }

    changePlant(plantType: PlantType) {
        this.plant = plantType;

        this.notifications.notify(plantType);

        // Checking if we need to update the PlantDetailsTab
        // TODO
    }

    openWiki(type: WikiType, id: string) {
        switch(type) {
            case WikiType.Bean: {
                this.goToBean(id as BeanType);
                break;
            }
            case WikiType.Plant: {
                this.goToPlant(id as PlantType);
                break;
            }
            default: {
                console.error(`Error - Could not open invalid wiki - ${type}, ${id}.`);
                break;
            }
        }
    }

    goToBean(beanType: BeanType) {
        // Sanity Check
        if (!beanType) {
            console.error("Error - Cannot open empty Bean.");
            return;
        }
        const bean = this.beans.list[beanType];
        if (!bean) {
            console.error("Error - Could not retrieve Bean from list.", beanType);
            return;
        }
        if (!bean.unlocked) {
            console.error("Error - Cannot open locked Bean.", beanType);
            return;
        }

        // Open Wiki modal
        this.controller.openModal(ModalType.Wiki);

        // Switch to Bean tab
        this.controller.changeTab(TabType.Wiki, 0);

        // Switching to correct category tab
        this.controller.changeTab(TabType.WikiBean, this.beans.list[beanType].category, true);

        // Open Bean
        this.changeBean(beanType);
        
        /*
        const beanElement = document.getElementById(bean.elementName);
        if (!beanElement) {
            console.error("Error - Could not find Bean element.", beanType);
            return;
        }

        // Make sure Bean is visible
        beanElement?.scrollIntoView(true);]
        */
    }

    goToPlant(plantType: PlantType) {
        // Sanity Check
        if (!plantType) {
            console.error("Error - Cannot open empty Plant.");
            return;
        }
        const plant = this.plants.list[plantType];
        if (!plant) {
            console.error("Error - Could not retrieve Plant from list.", plantType);
            return;
        }
        if (!plant.unlocked) {
            console.error("Error - Cannot open locked Plant.", plantType);
            return;
        }

        // Open Wiki modal
        this.controller.openModal(ModalType.Wiki);

        // Switch to Plant tab
        this.controller.changeTab(TabType.Wiki, 1);

        // Switching to correct category tab
        this.controller.changeTab(TabType.WikiPlant, this.plants.list[plantType].category, true);

        // Open Bean
        this.changePlant(plantType);

        /*
        const plantElement = document.getElementById(plant.elementName);
        if (!plantElement) {
            console.error("Error - Could not find Plant element.", plantType);
            return;
        }

        // Make sure Plant is visible
        plantElement?.scrollIntoView(true);
        */
    }

    /**
     * Returns the list of Beans to display in the Bean Wiki
     * Checks current BeanCategory tab and Bean unlock state
     */
    get beanList(): Bean[] {
        return this.beans.filter((bean: Bean) => {
            if (bean.category !== this.controller.tabs[TabType.WikiBean]) {
                return false;
            }
            return bean.unlocked;
        });
    }

    /**
     * Returns the list of Plants to display in the Plant Wiki
     * Checks current PlantCategory tab and Plant unlock state
     */
    get plantList(): Plant[] {
        return this.plants.filter((plant: Plant) => {
            if (plant.category !== this.controller.tabs[TabType.WikiPlant]) {
                return false;
            }
            return plant.unlocked;
        });
    }
    
    /**
     * Helper function to determine whether a Wiki link is active
     * @param type The WikiType
     * @param id The ID of the link
     * @returns True if the player can click the link, False otherwise
     */
    linkActive(type: WikiType, id: string): boolean {
        switch(type) {
            case WikiType.Bean: {
                const bean = this.beans.list[id as BeanType];
                if (!bean) {
                    return false;
                }
                return bean.unlocked;
            }
            case WikiType.Plant: {
                const plant = this.plants.list[id as PlantType];
                if (!plant) {
                    return false;
                }
                return plant.unlocked;
            }
        }

        // Should never reach this
        console.error(`Error - WikiType ${type} wasn't handled properly.`);
        return false;
    }

    load(data: WikiSaveData): void {
        // TODO:
        return;
    }
    save(): WikiSaveData {
        // TODO:
        return {};
    }
}