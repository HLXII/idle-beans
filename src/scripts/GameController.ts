import { Features } from "@/Features";
import { SaveData, IgtFeature, HotKeys, KeyBind, KeyEventType } from "incremental-game-template";
import Bean from "./bean/Bean";
import { BeanType, BeanList } from "./bean/BeanList";
import Beans from "./bean/Beans";
import PlantableBean from "./bean/PlantableBean";
import { LinkType } from "./controls/GameText";
import Farms from "./farm/Farms";
import Plant from "./plant/Plant";
import { PlantList, PlantType } from "./plant/PlantList";
import Plants from "./plant/Plants";


export enum ToolType {
    'Cursor' = 0,
    'Bean',
    'Sickle',
}

export enum ModalType {
    None = 0,
    Plot,
    Wiki,
    Settings,
    Achievements,
    Prestige,
}

export interface GameControllerSaveData extends SaveData {
    tool: ToolType;
    bean: BeanType;
    beanListSearch: string;
}

export default class GameController extends IgtFeature {

    /**Internal reference to Features */
    private farms!: Farms;
    private beans!: Beans;
    private plants!: Plants;

    //#region Selectors
    public tool: ToolType;

    public bean: BeanType;

    public plot: {row: number; col: number};
    //#endregion

    /**Modal handler */
    public openedModal: ModalType;

    /**Bean List Search Filter */
    public beanListSearch: string;

    //#region Prestige Modal properties
    public prestigeTab: number;
    //#endregion

    //#region Wiki Modal properties
    /**Wiki Tab */
    public wikiTab: number;
    /**Plant Wiki Tab */
    public plantTab: number;
    /**Bean Wiki Tab */
    public beanTab: number;
    /**Opened Bean */
    public wikiBean: BeanType;
    /**Opened Plant */
    public wikiPlant: PlantType;
    //#endregion

    //#region Settings Modal properties
    public settingsTab: number;
    //#endregion

    //#region Modifier Key booleans
    public ctrlKey = false;
    public shiftKey = false;
    public altKey = false;
    //#endregion

    constructor() {
        super('controller');

        this.tool = ToolType.Cursor;
        this.bean = 'Bean';
        this.plot = {row: 0, col: 0};

        this.openedModal = ModalType.None;
   
        this.beanListSearch = '';

        this.prestigeTab = 0;

        this.wikiTab = 0;
        this.plantTab = 0;
        this.beanTab = 0;

        this.settingsTab = 0;

        this.wikiBean = 'Bean';
        this.wikiPlant = 'Bean Bud';
    }

    initialize(features: Features): void {
        this.farms = features.farms;
        this.beans = features.beans;
        this.plants = features.plants;

        // Adding modifier key bindings
        HotKeys.addKeyBind(new KeyBind('ctrl', 'Ctrl Modifier Down', () => { this.ctrlKey = true; }, undefined, KeyEventType.KeyDown));
        HotKeys.addKeyBind(new KeyBind('ctrl', 'Ctrl Modifier Up', () => { this.ctrlKey = false; }, undefined, KeyEventType.KeyUp));
        HotKeys.addKeyBind(new KeyBind('shift', 'Shift Modifier Down', () => { this.shiftKey = true; }, undefined, KeyEventType.KeyDown));
        HotKeys.addKeyBind(new KeyBind('shift', 'Shift Modifier Up', () => { this.shiftKey = false; }, undefined, KeyEventType.KeyUp));
        HotKeys.addKeyBind(new KeyBind('alt', 'Alt Modifier Down', () => { this.altKey = true; }, undefined, KeyEventType.KeyDown));
        HotKeys.addKeyBind(new KeyBind('alt', 'Alt Modifier Up', () => { this.altKey = false; }, undefined, KeyEventType.KeyUp));
    
        // Adding tool hotkeys
        HotKeys.addKeyBind(new KeyBind('1', 'One', () => { this.changeTool(ToolType.Cursor); }));
        HotKeys.addKeyBind(new KeyBind('2', 'Two', () => { this.changeTool(ToolType.Bean); }));
        HotKeys.addKeyBind(new KeyBind('3', 'Three', () => { this.changeTool(ToolType.Sickle); }));

    }
    canAccess(): boolean {
        return true;
    }

    changeTool(tool: ToolType) {
        this.tool = tool;

        // Switch to visible bean
        if (this.tool === ToolType.Bean) {
            if (!this.beanIsVisibleInList(this.bean)) {
                if (this.filteredBeanList.length) {
                    this.bean = this.filteredBeanList[0].name as BeanType;
                }
            }
        }
    }

    changeBean(bean: BeanType) {
        if (this.tool !== ToolType.Bean) {
            this.changeTool(ToolType.Bean);
        }
        this.bean = bean;
    }

    clickDirt(row: number, col: number) {
        switch(this.tool) {
            case ToolType.Cursor: {
                this.plot = {row: row, col: col};
                this.openModal(ModalType.Plot);
                break;
            }
            case ToolType.Bean: {
                if (this.beanIsVisibleInList(this.bean)) {
                    this.farms.plantBean(this.bean, row, col);
                }
                break;
            }
            case ToolType.Sickle: {
                if (this.ctrlKey) {
                    this.farms.removePlant(row, col);
                } else {
                    this.farms.harvestPlant(row, col);
                }
                break;
            }
        }
    }

    clickPlant(row: number, col: number) {
        this.clickDirt(row, col);
    }

    get filteredBeanList(): Bean[] {
        return Object.values(BeanList).filter((bean: Bean) => {

            // Don't display if not plantable
            if (!(bean instanceof PlantableBean)) {
                return false;
            }

            // Don't display if there are no beans in inventory of this type
            if (bean.amount <= 0) {
                return false;
            }

            // Check search filter
            if (this.beanListSearch && !bean.name.toLowerCase().includes(this.beanListSearch.toLowerCase())) {
                return false;
            }

            return true;
        });
    }

    beanIsVisibleInList(beanType: BeanType) {
        return this.filteredBeanList.map((bean) => bean.name).includes(beanType);
    }

    load(data: GameControllerSaveData): void {
        this.tool = data?.tool ?? ToolType.Cursor;
        this.bean = data?.bean ?? 'Bean';
        this.beanListSearch = data?.beanListSearch ?? '';
    }
    save(): GameControllerSaveData {
        return {
            tool: this.tool,
            bean: this.bean,
            beanListSearch: this.beanListSearch,
        };
    }

    openModal(modalType: ModalType) {
        // Closing other modals
        this.closeModal();

        // Opening modal
        this.openedModal = modalType;
    }

    closeModal(nextModal?: ModalType) {
        // If next modal to open is already opened, do nothing.
        if (this.openedModal == nextModal) {
            return;
        }
        this.openedModal = ModalType.None;
    }

    //#region Prestige
    changePrestigeTab(tab: number) {
        this.prestigeTab = tab ?? 0;
    }
    //#endregion

    //#region Wiki
    changeWikiTab(tab: number) {
        this.wikiTab = tab ?? 0;
    }

    changePlantTab(tab: number) {
        this.plantTab = tab ?? 0;
        this.changeWikiPlant(this.wikiPlantList[0].name as PlantType);
    }

    changeBeanTab(tab: number) {
        this.beanTab = tab ?? 0;
        this.changeWikiBean(this.wikiBeanList[0].name as BeanType);
    }

    changeWikiBean(beanType: BeanType) {
        this.wikiBean = beanType;
    }

    changeWikiPlant(plantType: PlantType) {
        this.wikiPlant = plantType;
    }

    openWiki(type: LinkType, id: string) {
        switch(type) {
            case LinkType.Bean: {
                this.goToBean(id as BeanType);
                break;
            }
            case LinkType.Plant: {
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
        this.openModal(ModalType.Wiki);

        // Switch to Bean tab
        this.wikiTab = 0;

        // Switching to correct category tab
        this.changeBeanTab(this.beans.list[beanType].category);

        // Open Bean
        this.changeWikiBean(beanType);
        
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
        this.openModal(ModalType.Wiki);

        // Switch to Plant tab
        this.wikiTab = 1;

        // Switching to correct category tab
        this.changePlantTab(this.plants.list[plantType].category);

        // Open Bean
        this.changeWikiPlant(plantType);

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

    get wikiBeanList(): Bean[] {
        return Object.values(BeanList).filter((bean: Bean) => {
            if (bean.category !== this.beanTab) {
                return false;
            }
            return bean.unlocked;
        });
    }

    get wikiPlantList(): Plant[] {
        return Object.values(PlantList).filter((plant: Plant) => {
            if (plant.category !== this.plantTab) {
                return false;
            }
            return plant.unlocked;
        });    
    }

    linkActive(type: LinkType, id: string): boolean {
        switch(type) {
            case LinkType.Bean: {
                const bean = this.beans.list[id as BeanType];
                if (!bean) {
                    return false;
                }
                return bean.unlocked;
            }
            case LinkType.Plant: {
                const plant = this.plants.list[id as PlantType];
                if (!plant) {
                    return false;
                }
                return plant.unlocked;
            }
        }
    }
    //#endregion

    //#region Settings
    changeSettingsTab(tab: number) {
        this.settingsTab = tab ?? 0;
    }
    //#endregion
}