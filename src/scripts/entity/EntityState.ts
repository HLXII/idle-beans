import { App } from "@/App";
import { SaveData, Saveable } from "incremental-game-template";
import FarmLocation from "../farm/FarmLocation";
import { FarmType } from "../farm/FarmType";
import Plot from "../farm/Plot";
import { SVGData } from "../plant/PlantImages";
import Status from "./Status";


export interface EntityStateSaveData extends SaveData, FarmLocation {
    type: string;
    age: number;
}

export default abstract class EntityState implements Saveable, FarmLocation {

    /** Entity type. To be defined in children classes */
    public type!: string;

    /** Position in the Farm */
    public farm!: FarmType;
    public row!: number;
    public col!: number;

    /** Age (in seconds) */
    public age: number;

    constructor(location?: FarmLocation) {
        if (location) {
            this.farm = location.farm;
            this.row = location.row;
            this.col = location.col;
        }

        this.age = 0;
    }

    /**
     * Update the Entity
     * @param delta Time passed in seconds
     */
    update(delta: number) {
        this.age += delta;
    }

    /**
     * Returns the Statuses for this Entity
     */
    abstract statuses: Status[];
    
    /**
     * Returns the Plant object associated with this PlantState
     */
    // get data(): Plant {
    //      return App.game.features.plants.list[this.type];
    // }

    /**
     * Obtains the Plot the Plant is on
     */
     get plot(): Plot {
        return App.game.features.farms.farms[this.farm].plots[this.row][this.col];
    }
    
    /**
     * Returns the Plant image SVGData
     */
    abstract image: SVGData;

    /**
     * Returns the Plant Icon SVGData
     */
    abstract icon: SVGData;

    /**
     * Returns the name for the component to display in the modal
     */
    get modalTemplate(): string {
        return "";
    }

    //#region Save
    saveKey = '';
    save(): EntityStateSaveData {
        return {
            type: this.type,
            farm: this.farm,
            row: this.row,
            col: this.col,
            age: this.age,
        };
    }
    load(data: EntityStateSaveData): void {
        this.farm = data.farm ?? FarmType.plains;
        this.row = data.row ?? 0;
        this.col = data.col ?? 0;
        this.age = data.age ?? 0;
    }
    //#endregion

}