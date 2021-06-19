import { App } from "@/App";
import { Features } from "@/Features";
import { SaveData, IgtFeature, AbstractField } from "incremental-game-template";
import Bean from "./bean/Bean";
import { BeanType, BeanList } from "./bean/BeanList";
import Farms from "./farm/Farms";


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

export enum BeanListFilterType {
    Unlocked,
    All,
}

export interface GameControllerSaveData extends SaveData {
    tool: ToolType;
    bean: BeanType;
    beanListFilter: BeanListFilterType;
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

    /**Bean List Filter Status */
    public beanListFilter!: BeanListFilterType;
    /**Bean List Search Filter */
    public beanListSearch!: string;

    //#region Wiki Modal properties
    /**Wiki Tab */
    public wikiTab!: number;
    /**Plant Wiki  Tab */
    public plantTab!: number;
    /**Opened Bean */
    public wikiBean!: BeanType;
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
   
        this.beanListFilter = BeanListFilterType.All;
        this.beanListSearch = '';

        this.wikiTab = 0;
        this.plantTab = 0;

        this.wikiBean = 'Bean';
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

    public changeTool(tool: ToolType) {
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

    toggleBeanFilter() {
        console.log(Object.keys(BeanListFilterType).length);
        this.beanListFilter = ((this.beanListFilter as number) + 1) % 2;
    }

    get beanfilterDescription(): string {
        switch(this.beanListFilter) {
            case BeanListFilterType.Unlocked:
                return 'Only display Beans unlocked in this playthrough';
            case BeanListFilterType.All:
                return 'Display all unlocked beans';
            default:
                return 'Error - Invalid Bean Filter';
        }
    }

    get filteredList(): Bean[] {
        return Object.values(BeanList).filter((bean: Bean) => {
            switch(this.beanListFilter) {
                case BeanListFilterType.Unlocked: {
                    if (!bean.unlocked) {
                        return false;
                    }
                    break;
                }
                case BeanListFilterType.All: {
                    if (!bean.globalUnlocked) {
                        return false;
                    }
                    break;
                }
                default:
                    break;
            }

            if (this.beanListSearch && !bean.name.toLowerCase().includes(this.beanListSearch.toLowerCase())) {
                return false;
            }

            return true;
        });
    }

    load(data: GameControllerSaveData): void {
        this.tool = data?.tool ?? ToolType.Cursor;
        this.bean = data?.bean ?? 'Bean';
        this.beanListFilter = data?.beanListFilter ?? BeanListFilterType.Unlocked;
        this.beanListSearch = data?.beanListSearch ?? '';
    }
    save(): GameControllerSaveData {
        return {
            tool: this.tool,
            bean: this.bean,
            beanListFilter: this.beanListFilter,
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

    goToBean(beanType: BeanType) {
        // Sanity Check
        if (!beanType) {
            console.error("Error - Cannot open empty Bean.");
            return;
        }
        const bean = App.game.features.beans.list[beanType];
        if (!bean) {
            console.error("Error - Could not retrieve Bean from list.", beanType);
        }
        if (!bean.globalUnlocked) {
            console.error("Error - Cannot open locked Bean.", beanType);
            return;
        }
        const beanElement = document.getElementById(bean.elementName);
        if (!beanElement) {
            console.error("Error - Could not find Bean element.", beanType);
        }

        // Open Wiki modal
        this.openWikiModal();

        // Switch to Bean tab
        this.wikiTab = 0;

        // Open Bean
        this.wikiBean = beanType;

        // Make sure Bean is visible
        beanElement?.scrollIntoView(true);
    }

    get wikiBeanList(): Bean[] {
        return Object.values(BeanList).filter((bean: Bean) => bean.globalUnlocked);
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