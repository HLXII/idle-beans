import { App } from "@/App";
import { AbstractField } from "../ig-template/developer-panel/fields/AbstractField";
import { Features } from "../ig-template/Features";
import { SaveData } from "../ig-template/tools/saving/SaveData";
import Bean from "./bean/Bean";
import { BeanList, BeanType } from "./bean/BeanList";
import Farm from "./farm/Farm";
import Plot from "./farm/Plot";
import { Feature } from "../ig-template/features/Feature";

export enum ToolType {
    'Cursor' = 0,
    'Bean',
    'Sickle',
}

export default class GameController implements Feature {

    public tool: ToolType;

    public bean: BeanType;

    public plot?: Plot;

    private farm?: Farm;

    constructor() {
        this.tool = ToolType.Cursor;
        this.bean = 'Bean';
        this.plot = undefined;
    }

    getDeveloperPanelFields(): AbstractField[] {
        return [];
    }
    initialize(features: Features): void {
        this.farm = features.farm;
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
                this.farm?.plantBean(this.bean, row, col);
                break;
            }
            case ToolType.Sickle: {
                this.farm?.removePlant([row, col]);
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

    saveKey = 'controller';
    load(data: SaveData): void {
        return;
    }
    save(): SaveData {
        return {};
    }

    openPlotModal(row: number, col: number) {
        // Retrieving plot
        const plot = this.farm?.plots[row][col];
        this.plot = plot;
        // Opening modal
        //const myModal = new Modal(document.getElementById('plotModal'));
        //myModal.show();
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

}