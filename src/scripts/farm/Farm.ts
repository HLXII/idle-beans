import { App } from "@/App";
import { AbstractField } from "@/ig-template/developer-panel/fields/AbstractField";
import { Features } from "@/ig-template/Features";
import { Feature } from "@/ig-template/features/Feature";
import { SaveData } from "@/ig-template/tools/saving/SaveData";
import { BeanType } from "../bean/BeanList";
import { isPlantable } from "../bean/Plantable";
import { PlantType } from "../plant/PlantList";
import Plot, { PlotSaveData } from "./Plot";


export interface FarmSaveData extends SaveData {
    plots: PlotSaveData[][];
}

export default class Farm implements Feature {

    public plots: Plot[][];
    public readonly defaultPlotSize: number = 5;

    constructor() {
        this.plots = [];
    }

    getDeveloperPanelFields(): AbstractField[] {
        // TODO
        return [];
    }
    initialize(features: Features): void {
        this.initPlots();
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

    //#region Plot methods

    /**
     * Initialize empty default plots
     */
    private initPlots() {
        this.plots = [];
        for (let i = 0; i < this.defaultPlotSize; i++) {
            const row: Plot[] = [];
            for (let j = 0; j < this.defaultPlotSize; j++) {
                row.push(new Plot(i, j));
            }
            this.plots.push(row);
        }
    }

    /**
     * Load plots from save
     * @param plotData 2D array of plot data
     */
    private loadPlots(plotData: PlotSaveData[][]) {
        this.plots = [];
        for (let i = 0; i < plotData.length; i++) {
            const row: Plot[] = [];
            for (let j = 0; j < plotData[0].length; j++) {
                const plot = new Plot(i, j);
                plot.load(plotData[i][j]);
                row.push(plot);
            }
            this.plots.push(row);
        }
    }

    private isValidCoord(row: number, col: number) {
        // TODO: Handle farm expansion
        const plotSize = 5;
        
        return row >= 0 && row < plotSize && col >= 0 && col < plotSize;
    }

    orthoPlots(plot: Plot): Plot[] {
        const row = plot.row;
        const col = plot.col;

        const plotIndices = [[row - 1, col], [row, col - 1], [row, col + 1], [row + 1, col]];
        
        return plotIndices.filter(([r, c]) => this.isValidCoord(r, c))
            .map(([r, c]) => this.plots[r][c]);
    }

    diagPlots(plot: Plot): Plot[] {
        const row = plot.row;
        const col = plot.col;

        const plotIndices = [[row - 1, col - 1], [row - 1, col + 1], [row + 1, col - 1], [row + 1, col + 1]];
        
        return plotIndices.filter(([r, c]) => this.isValidCoord(r, c))
            .map(([r, c]) => this.plots[r][c]);
    }

    nearPlots(plot: Plot): Plot[] {
        const row = plot.row;
        const col = plot.col;

        const plots = [];
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (!this.isValidCoord(r, c)) {
                    continue;
                }
                if (r === row && c === col) {
                    continue;
                }

                plots.push(this.plots[r][c]);
            }
        }

        return plots;
    }

    /**
     * Checks whether the given plots contain all the plant types given.
     * @param plots The plots to check
     * @param plant The plant types to check for. Can be singular or a list.
     */
    containsPlant(plots: Plot[], plant: PlantType | PlantType[]): boolean {
        // Collapsing plant parameter
        if (!Array.isArray(plant)) {
            plant = [plant];
        }
        return plant.every((plant) => {
            return plots.some((plot: Plot) => {
                return (plot.plant !== undefined) && (plot.plant.plant == plant);
            });
        });
    }

    /**
     * Checks whether the given plots contain at least the amount of plant types given
     * @param plots The plots to check
     * @param plant The plants, and the minimum amount required.
     */
    containsAtLeast(plots: Plot[], plant: { plant: PlantType; amount: number } | { plant: PlantType; amount: number }[]): boolean {
        // Collapsing plant parameter
        if (!Array.isArray(plant)) {
            plant = [plant];
        }

        // Counting plots
        const availablePlants: any = {};
        plots.forEach((plot) => {
            if (!plot.plant) {
                return;
            }
            if (!availablePlants[plot.plant.plant]) {
                availablePlants[plot.plant.plant] = 1;
            } else {
                availablePlants[plot.plant.plant] += 1;
            }
        });

        // Checking requirement
        return plant.every((plant) => {
            return availablePlants[plant.plant] >= plant.amount;
        });
    }

    //#endregion

    update(delta: number) {
        // Updating plots
        this.plots.forEach((row) => row.forEach((plot => {
            plot.update(delta);
        })));
    }

    plantBean(beanType: BeanType, row: number, col: number) {
        // Sanity checks
        if (beanType == undefined) {
            return;
        }
        // TODO: Check row/col validity
        
        const plot = this.plots[row][col];
        const bean = App.game.features.beans.list[beanType];
        // Check if can plant bean
        if (isPlantable(bean)) {
            bean.plant(plot);
        }
    }

    removePlant(plot: number[] | Plot) {
        if (!(plot instanceof Plot)) {
            const [row, col] = plot;
            // TODO: Check row/col validity
            plot = App.game.features.farm.plots[row][col];
        }
        // No plant to remove
        if (!plot.plant) {
            return;
        }

        plot.removePlant();
    }

    saveKey = 'farm';
    load(data: FarmSaveData): void {
        this.loadPlots(data.plots);
    }
    save(): FarmSaveData {
        const data: FarmSaveData = {
            plots: this.plots.map(row => row.map(plot => plot.save()))
        };
        return data;
    }

}