import { AbstractField } from "@/ig-template/developer-panel/fields/AbstractField";
import { Features } from "@/ig-template/Features";
import { Feature } from "@/ig-template/features/Feature";
import { SaveData } from "@/ig-template/tools/saving/SaveData";
import Bean from "./bean/Bean";
import { BeanType, BeanList } from "./bean/BeanList";
import Farms from "./farm/Farms";


export enum ToolType {
    'Cursor' = 0,
    'Bean',
    'Sickle',
}

export default class GameController extends Feature {

    private farms!: Farms;

    public tool!: ToolType;

    public bean!: BeanType;

    public plot!: {row: number; col: number};

    public showPlotModal!: boolean;

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

        this.showPlotModal = false;
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

    get filteredList(): Bean[] {
        return Object.values(BeanList).filter((bean: Bean) => {
            return true;
        });
    }

    load(data: SaveData): void {
        return;
    }
    save(): SaveData {
        return {};
    }

    openPlotModal(row: number, col: number) {
        this.plot = {row: row, col: col};

        // Closing other modals
        this.closeModals();

        // Opening modal
        this.showPlotModal = true;
    }

    openWikiModal() {
        // Opening modal
        //const myModal = new Modal(document.getElementById('wikiModal'));
        //myModal.show();
    }

    openSettingsModal() {
        // Opening modal
        //const myModal = new Modal(document.getElementById('settingsModal'));
        //myModal.show();
    }

    closeModals() {
        this.showPlotModal = false;
    }

}