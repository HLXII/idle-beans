import { Features } from "@/Features";
import { SaveData, IgtFeature } from "incremental-game-template";
import Bean from "../bean/Bean";
import { BeanType } from "../bean/BeanList";
import Beans from "../bean/Beans";
import GameController, { InfoType, TabType } from "../GameController";
import Notifications from "../notifications/Notifications";
import Plant from "../plant/Plant";
import { SVGData } from "../plant/PlantImages";
import { PlantType } from "../plant/PlantList";
import Plants from "../plant/Plants";
import { WikiType } from "./WikiType";

export interface WikiEntry {
    type: WikiType;
    name: string;
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

    /**Wiki Selectors */
    public bean: BeanType;
    public plant: PlantType;
    public farmEntry: string;
    public selectedEntry: {[key: number]: string};


    public entries!: WikiEntry[];

    constructor() {
        super('wiki');

        this.bean = 'Bean';
        this.plant = 'Bean Bud';
        this.farmEntry = 'Plains';

        this.selectedEntry = {
            [WikiType.Bean]: 'Bean',
            [WikiType.Plant]: 'Bean Bud',
            [WikiType.Farm]: 'Plains',
        }
    }

    initialize(features: Features): void {
        this.beans = features.beans;
        this.plants = features.plants;
        this.controller = features.controller;
        this.notifications = features.notifications;
    
        this.entries = [];
        this.entries.push(...Object.values(this.beans.list));
        this.entries.push(...Object.values(this.plants.list));
    }
    canAccess(): boolean {
        return true;
    }

    changeEntry(wikiType: WikiType, entry: string) {
        this.selectedEntry[wikiType] = entry;

        this.notifications.notify(entry);
    }

    /**
     * Maps the WikiType value to the associated Wiki category Tab
     * @param wikiType 
     */
    private mapWikiCatTab(wikiType: WikiType): TabType {
        switch(wikiType) {
            case WikiType.Bean:
                return TabType.WikiBean;
            case WikiType.Plant:
                return TabType.WikiPlant;
            case WikiType.Farm:
                return TabType.WikiFarm;
            default:
                console.error(`Error - Attempting to map unknown WikiType ${wikiType}.`);
                return TabType.WikiBean;
        }
    }

    openWiki(type: WikiType, name: string) {
        const entry = this.entries.find((entry) => entry.type === type && entry.name === name);

        if (entry === undefined) {
            console.error(`Error - Could not open invalid Wiki Entry - ${type}, ${name}.`);
            return;
        }

        if (!entry.visible) {
            console.error(`Error - Wiki Entry is not visible - ${type}, ${name}.`);
            return;
        }
        
        // Open Wiki
        this.controller.openInfo(InfoType.Wiki);

        // Switch to WikiType tab
        this.controller.changeTab(TabType.Wiki, type);

        // Switching to correct category tab

        this.controller.changeTab(this.mapWikiCatTab(type), entry.category, true);

        // Open Bean
        this.changeEntry(type, name);
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