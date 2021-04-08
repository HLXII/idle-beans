import { App } from "@/App";
import { Saveable } from "@/ig-template/tools/saving/Saveable";
import { SaveData } from "@/ig-template/tools/saving/SaveData";
import Plants from "../plant/Plants";
import PlantState, { PlantStateSaveData } from "../plant/PlantState";
import { FarmType } from "./FarmType";
import Plot, { PlotSaveData } from "./Plot";

export interface FarmSaveData extends SaveData {
    size: number;
    plots: PlotSaveData[][];
    plants: (PlantStateSaveData | undefined)[];
}

export default abstract class AbstractFarm implements Saveable {

    public type: FarmType;

    public plots: Plot[][];

    public plants: (PlantState | undefined)[];

    private _size!: number;

    abstract canAccess(): boolean;

    public readonly defaultPlotSize: number = 5;

    constructor(type: FarmType) {
        this.type = type;

        this.plots = [];
        this.plants = [];

        this._size = 0;
        this.size = this.defaultPlotSize;

        this.initPlots();
    }

    get size(): number {
        return this._size;
    }

    set size(size: number) {
        if (this._size !== size) {
            console.log(`Updating Farm ${FarmType[this.type]} size from ${this._size} to ${size}.`);

            // Updating Plots and Plants
            if (size > this._size) {
                const delta = size - this._size;

                // Expanding current rows
                this.plots.forEach((row, idx) => {
                    for (let i = 0; i < delta; i++) {
                        row.push(new Plot(this.type, idx, this._size + i));
                    }
                });
                // Adding new rows
                for (let i = 0; i < delta; i++) {
                    const newRow = [...new Array(size)].map((_,j) => new Plot(this.type, this._size + delta, j));
                    this.plots.push(newRow);
                }

                // Expanding and shifting plants
                const newPlants = new Array(size * size).fill(undefined);
                this.plants.forEach((plant, idx) => {
                    // Parsing original coords
                    const [newRow, newCol] = this.getPlantCoord(plant ?? idx);
                    const newIdx = this.getPlantId(newRow, newCol, size);
                    newPlants[newIdx] = plant;
                });

                this.plants = newPlants;
            } else {
                console.error('Error: This is not currently possible based on the game\'s design.');
                return;
            }

            // Updating size
            this._size = size;
        }
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
                row.push(new Plot(this.type, i, j));
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
                const plot = new Plot(this.type, i, j);
                plot.load(plotData[i][j]);
                row.push(plot);
            }
            this.plots.push(row);
        }
    }

    isValidCoord(row: number, col: number) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }

    //#endregion

    getPlot(row: number, col: number): Plot {
        return this.plots[row][col];
    }

    getPlantId(row: number, col: number, size?: number): number {
        size = size ?? this.size;
        return (row * size) + col;
    }

    getPlantCoord(plantOrIdx: PlantState | number): number[] {
        if (plantOrIdx instanceof PlantState) {
            return [plantOrIdx.row, plantOrIdx.col];
        } else {
            const row = plantOrIdx % this.size;
            const col = plantOrIdx - row;
            return [row, col];
        }
    }

    getPlant(row: number, col: number): PlantState | undefined {
        return this.plants[this.getPlantId(row, col)];
    }

    addPlant(state: PlantState, row: number, col: number) {
        // Sanity Check
        const prevPlant = this.getPlant(row, col);
        if (prevPlant) {
            console.error('Error - Cannot add plant over existing plant', prevPlant);
            return;
        }

        const id = this.getPlantId(row, col);
        this.plants.splice(id, 1, state);
    }

    removePlant(row: number, col: number) {
        // Sanity Check
        const prevPlant = this.getPlant(row, col);
        if (!prevPlant) {
            console.error('Error - Attempting to remove plant that doesn\'t exist');
            return;
        }

        const id = this.getPlantId(row, col);
        this.plants.splice(id, 1, undefined);
    }

    update(delta: number) {
        // Updating plots
        this.plots.forEach((row) => row.forEach((plot => {
            plot.update(delta);
        })));

        // Updating plants
        Object.values(this.plants).forEach((plant) => {
            plant?.update(delta);
        });
    }

    get saveKey(): string {
        return this.type.toString();
    }
    load(data: FarmSaveData): void {
        this.size = data.size ?? this.defaultPlotSize;

        this.loadPlots(data.plots);

        data.plants.forEach((plant) => {
            if (!plant) {
                return undefined;
            }
            const plantState = App.game.features.plants.list[plant.type].state();
            plantState.load(plant);
            this.addPlant(plantState, plantState.row, plantState.col);
        });
    }
    save(): FarmSaveData {
        const data: FarmSaveData = {
            size: this.size,
            plots: this.plots.map(row => row.map(plot => plot.save())),
            plants: this.plants.map(plant => plant?.save()),
        };
        return data;
    }

}