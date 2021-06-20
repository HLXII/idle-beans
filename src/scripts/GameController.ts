import { App } from "@/App";
import { Features } from "@/Features";
import { SaveData, IgtFeature, AbstractField } from "incremental-game-template";
import Bean from "./bean/Bean";
import { BeanType, BeanList } from "./bean/BeanList";
import Farms from "./farm/Farms";
import Plant from "./plant/Plant";
import { PlantList, PlantType } from "./plant/PlantList";


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
}

export interface GameControllerSaveData extends SaveData {
    tool: ToolType;
    bean: BeanType;
    beanListSearch: string;
}

export default class GameController extends IgtFeature {

    /**Internal reference to Farms Feature */
    private farms!: Farms;

    //#region Selectors
    public tool!: ToolType;

    public bean!: BeanType;

    public plot!: {row: number; col: number};
    //#endregion

    /**Modal handler */
    public openedModal!: ModalType;

    /**Bean List Search Filter */
    public beanListSearch!: string;

    //#region Wiki Modal properties
    /**Wiki Tab */
    public wikiTab!: number;
    /**Plant Wiki  Tab */
    public plantTab!: number;
    /**Opened Bean */
    public wikiBean!: BeanType;
    /**Opened Plant */
    public wikiPlant!: PlantType;
    //#endregion

    constructor() {
        super('controller');
    }

    getDeveloperPanelFields(): AbstractField[] {
        return [];
    }
    initialize(features: Features): void {
        this.farms = features.farms;

        this.tool = ToolType.Cursor;
        this.bean = 'Bean';
        this.plot = {row: 0, col: 0};

        this.openedModal = ModalType.None;
   
        this.beanListSearch = '';

        this.wikiTab = 0;
        this.plantTab = 0;

        this.wikiBean = 'Bean';
        this.wikiPlant = 'Bean Bud';
    }
    start(): void {
        return;
    }
    stop(): void {
        return;
    }
    canAccess(): boolean {
        return true;
    }
    update(delta: number): void {
        return;
    }

    changeTool(tool: ToolType) {
        console.log(`Changing Tool to ${ToolType[tool]}`);
        this.tool = tool;
    }

    changeBean(bean: BeanType) {
        if (this.tool !== ToolType.Bean) {
            return;
        }
        console.log(`Changing Bean to ${bean}`);
        this.bean = bean;
    }

    clickDirt(row: number, col: number) {
        console.log(`Clicked Plot - ${row},${col} - ${ToolType[this.tool]}`);
        switch(this.tool) {
            case ToolType.Cursor: {
                this.openPlotModal(row, col);
                break;
            }
            case ToolType.Bean: {
                this.farms.plantBean(this.bean, row, col);
                break;
            }
            case ToolType.Sickle: {
                this.farms.removePlant(row, col);
                break;
            }
        }
    }

    clickPlant(row: number, col: number) {
        this.clickDirt(row, col);
    }

    get filteredList(): Bean[] {
        return Object.values(BeanList).filter((bean: Bean) => {

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

    openPlotModal(row: number, col: number) {
        this.plot = {row: row, col: col};

        // Closing other modals
        this.closeModal();

        // Opening modal
        this.openedModal = ModalType.Plot;
    }

    //#region Wiki
    openWikiModal() {
        // Closing other modals
        this.closeModal();

        // Opening modal
        this.openedModal = ModalType.Wiki;
    }

    changeTab(tab: number) {
        this.wikiTab = tab ?? 0;
    }

    changeWikiBean(beanType: BeanType) {
        this.wikiBean = beanType;
    }

    changeWikiPlant(plantType: PlantType) {
        this.wikiPlant = plantType;
    }

    goToBean(beanType: BeanType) {
        // Sanity Check
        if (!beanType) {
            console.error("Error - Cannot open empty Bean.");
            return;
        }
        const bean = App.game.features.beans.list[beanType];
        if (!bean) {
            console.error("Error - Could not retrieve Bean from list.", beanType);
            return;
        }
        if (!bean.unlocked) {
            console.error("Error - Cannot open locked Bean.", beanType);
            return;
        }
        const beanElement = document.getElementById(bean.elementName);
        if (!beanElement) {
            console.error("Error - Could not find Bean element.", beanType);
            return;
        }

        // Open Wiki modal
        this.openWikiModal();

        // Switch to Bean tab
        this.wikiTab = 0;

        // Open Bean
        this.changeWikiBean(beanType);

        // Make sure Bean is visible
        beanElement?.scrollIntoView(true);
    }

    goToPlant(plantType: PlantType) {
        // Sanity Check
        if (!plantType) {
            console.error("Error - Cannot open empty Plant.");
            return;
        }
        const plant = App.game.features.plants.list[plantType];
        if (!plant) {
            console.error("Error - Could not retrieve Plant from list.", plantType);
            return;
        }
        if (!plant.unlocked) {
            console.error("Error - Cannot open locked Plant.", plantType);
            return;
        }
        const plantElement = document.getElementById(plant.elementName);
        if (!plantElement) {
            console.error("Error - Could not find Plant element.", plantType);
            return;
        }

        // Open Wiki modal
        this.openWikiModal();

        // Switch to Plant tab
        this.wikiTab = 1;

        // Open Bean
        this.changeWikiPlant(plantType);

        // Make sure Plant is visible
        plantElement?.scrollIntoView(true);
    }

    get wikiBeanList(): Bean[] {
        return Object.values(BeanList).filter((bean: Bean) => bean.unlocked);
    }

    get wikiPlantList(): Plant[] {
        return Object.values(PlantList).filter((plant: Plant) => plant.unlocked);
    }

    //#endregion

    openSettingsModal() {
        // Closing other modals
        this.closeModal();

        // Opening modal
        this.openedModal = ModalType.Settings;
    }

    closeModal(nextModal?: ModalType) {
        // If next modal to open is already opened, do nothing.
        if (this.openedModal == nextModal) {
            return;
        }
        this.openedModal = ModalType.None;
    }

}