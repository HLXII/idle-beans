import { App } from "@/App";
import { SaveData, Saveable } from "incremental-game-template";
import EntityState, { EntityStateSaveData } from "../entity/EntityState";
import { PlantType } from "../plant/PlantList";
import PlantState, { PlantStateSaveData } from "../plant/PlantState";
import { FarmType } from "./FarmType";
import Plot, { PlotSaveData } from "./Plot";

export interface FarmSaveData extends SaveData {
    size: number;
    plots: PlotSaveData[][];
    entities: (EntityStateSaveData | undefined)[];
}

export default abstract class AbstractFarm implements Saveable {

    public type: FarmType;

    public name: string;

    public plots: Plot[][];

    /** 
     * The Entities in the farm.
     * Adding this as a note for me in the future. We store these in a separate array rather than
     * storing them as properties in the Plot object because that causes issues with Vue updating
     * The Entities in the UI.
     */
    public entities: (EntityState | undefined)[];

    private _size!: number;

    abstract canAccess(): boolean;

    public readonly defaultPlotSize: number = 5;

    constructor(type: FarmType, name: string) {
        this.type = type;
        this.name = name;

        this.plots = [];
        this.entities = [];

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

            // Updating Plots and Entities
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

                // Expanding and shifting Entities
                const newEntities = new Array(size * size).fill(undefined);
                this.entities.forEach((entity, idx) => {
                    // Parsing original coords
                    const [newRow, newCol] = this.getEntityCoord(entity ?? idx);
                    const newIdx = this.getEntityId(newRow, newCol, size);
                    newEntities[newIdx] = entity;
                });

                this.entities = newEntities;
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

    getEntityId(row: number, col: number, size?: number): number {
        size = size ?? this.size;
        return (row * size) + col;
    }

    getEntityCoord(entityOrIdx: EntityState | number): number[] {
        if (entityOrIdx instanceof EntityState) {
            return [entityOrIdx.row, entityOrIdx.col];
        } else {
            const row = entityOrIdx % this.size;
            const col = entityOrIdx - row;
            return [row, col];
        }
    }

    getEntity(row: number, col: number): EntityState | undefined {
        return this.entities[this.getEntityId(row, col)];
    }

    addEntity(state: EntityState, row: number, col: number) {
        // Sanity Check
        const prevEntity = this.getEntity(row, col);
        if (prevEntity) {
            console.error('Error - Cannot add Entity over existing Entity', prevEntity);
            return;
        }

        const id = this.getEntityId(row, col);
        this.entities.splice(id, 1, state);
    }

    removeEntity(row: number, col: number) {
        // Sanity Check
        const prevEntity = this.getEntity(row, col);
        if (!prevEntity) {
            console.error('Error - Attempting to remove Entity that doesn\'t exist');
            return;
        }

        const id = this.getEntityId(row, col);
        this.entities.splice(id, 1, undefined);
    }

    update(delta: number) {
        // Updating plots
        this.plots.forEach((row) => row.forEach((plot => {
            plot.update(delta);
        })));

        // Updating plants
        Object.values(this.entities).forEach((entity) => {
            entity?.update(delta);
        });
    }

    get background(): string {
        return 'url(' + require(`@/assets/images/backgrounds/${this.name}.png`) + ')';
    }

    get saveKey(): string {
        return this.type.toString();
    }
    load(data: FarmSaveData): void {
        this.size = data.size ?? this.defaultPlotSize;

        this.loadPlots(data.plots);

        // Loading Entities
        if (data.entities) {
            data.entities.forEach((entity) => {
                if (!entity) {
                    return undefined;
                }
                // Try to load plant
                const plant = App.game.features.plants.list[entity.type as PlantType];
                if (plant) {
                    const plantState = plant.state();
                    plantState.load(entity as PlantStateSaveData);
                    this.addEntity(plantState, plantState.row, plantState.col);
                }
            });
        }
    }
    save(): FarmSaveData {
        const data: FarmSaveData = {
            size: this.size,
            plots: this.plots.map(row => row.map(plot => plot.save())),
            entities: this.entities.map(entity => entity?.save()),
        };
        return data;
    }

}