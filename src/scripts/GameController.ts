import { Features } from "@/Features";
import { SaveData, IgtFeature, HotKeys, KeyBind, KeyEventType } from "incremental-game-template";
import Bean from "./bean/Bean";
import { BeanType, BeanList } from "./bean/BeanList";
import Beans from "./bean/Beans";
import Farms from "./farm/Farms";
import { PlantType } from "./plant/PlantList";
import Plants from "./plant/Plants";
import { Settings } from "./Settings";
import Wiki from "./wiki/Wiki";
import { WikiType } from "./wiki/WikiType";

export enum ToolType {
    'Cursor' = 0,
    'Bean',
    'Sickle',
}

export enum TabType {
    Wiki = "Wiki",
    WikiPlant = "WikiPlant",
    WikiBean = "WikiBean",
    WikiFarm = "WikiFarm",
    Settings = "Settings",
    Prestige = "Prestige",
    PrestigeShop = "PrestigeShop",
    Info = "Info",
}

export enum InfoType {
    None = 0,
    Plot,
    Wiki,
    Prestige,
    Achievements,
    Settings,
    PrestigeShop,
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
    private settings!: Settings;
    private wiki!: Wiki;

    //#region Selectors
    public tool: ToolType;

    public bean: BeanType;

    public plot: {row: number; col: number};
    //#endregion

    /**Modal handler */
    public openedModal: InfoType;

    /**Bean List Search Filter */
    public beanListSearch: string;

    /**Tab handler */
    public tabs: Record<TabType, number>;

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

        this.openedModal = InfoType.None;
   
        this.beanListSearch = '';

        this.tabs = {
            'Wiki': 0,
            'WikiPlant': 0,
            'WikiBean': 0,
            "WikiFarm": 0,
            'Settings': 0,
            'Prestige': 0,
            'PrestigeShop': 0,
            'Info': InfoType.Plot,
        };
    }

    initialize(features: Features): void {
        this.farms = features.farms;
        this.beans = features.beans;
        this.plants = features.plants;
        this.settings = features.settings;
        this.wiki = features.wiki;

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
                this.openInfo(InfoType.Plot);
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
                    this.farms.removeEntity(row, col);
                } else {
                    this.farms.harvestPlant(row, col);
                }
                break;
            }
        }
    }

    clickEntity(row: number, col: number) {
        this.clickDirt(row, col);
    }

    get filteredBeanList(): Bean[] {
        return Object.values(BeanList).filter((bean: Bean) => {

            // Don't display if not plantable
            //if (!(bean instanceof PlantableBean)) {
            //    return false;
            //}

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

    openInfo(infoType: InfoType) {
        if (this.settings.getSetting('useModal')?.value) {
            this.openModal(infoType);
        } else {
            this.changeTab(TabType.Info, infoType);

        }
    }

    openModal(infoType: InfoType) {
        // Closing other modals
        this.closeModal();

        // Opening modal
        this.openedModal = infoType;
    }

    closeModal(nextModal?: InfoType) {
        // If next modal to open is already opened, do nothing.
        if (this.openedModal == nextModal) {
            return;
        }
        this.openedModal = InfoType.None;
    }

    /**
     * Handler for nav tab changes.
     * @param tabType The TabType to change
     * @param tab The tab number to change to
     * @param ignoreSpecialUpdates Set to true to ignore updating additional tab properties
     */
    changeTab(tabType: TabType, tab: number, ignoreSpecialUpdates: boolean = false): void {
        if (!TabType[tabType]) {
            console.error(`Error - Invalid tab change - ${tabType}.`);
            return;
        }
        this.tabs[tabType] = tab ?? 0;

        // Special Tab updates
        if (!ignoreSpecialUpdates) {
            switch(tabType) {
                case TabType.WikiPlant: {
                    this.wiki.changeEntry(WikiType.Plant, this.wiki.plantList[0].name as PlantType);
                    break;
                }
                case TabType.WikiBean: {
                    this.wiki.changeEntry(WikiType.Bean, this.wiki.beanList[0].name as BeanType);
                    break;
                }
            }
        }
    }
}