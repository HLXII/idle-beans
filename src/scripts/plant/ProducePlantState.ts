import { App } from "@/App";
import FarmLocation from "../farm/FarmLocation";
import { getImage, SVGData } from "./PlantImages";
import { PlantType } from "./PlantList";
import PlantState, { PlantStateSaveData } from "./PlantState";
import Status from "../entity/Status";
import ProducePlant from "./ProducePlant";

export interface ProducePlantStateSaveData extends PlantStateSaveData {
    storage: number;
    productionTime: number;
}

export default class ProducePlantState extends PlantState {

    /**Number of Beans stored on the Plant */
    public storage: number;
    /**Production cycle time */
    public productionTime: number;

    constructor(name: PlantType, location?: FarmLocation) {
        super(name, location);

        this.productionTime = 0;
        this.storage = 0;
    }

    update(delta: number) {
        super.update(delta);

        
        const plant = this.data;

        if (!this.isFull) {
            // Handling production
            this.productionTime += delta;
            if (this.productionTime >= plant.produceTime(this)) {
                const produceAmount = plant.produceAmount(this);
                // Storing on Plant if there is space
                const storeAmount = Math.min(plant.storage(this) - this.storage, produceAmount);
                this.storage += storeAmount;
    
                // Collecting extra Beans at a lower rate
                //const collectedBeans = Math.floor((produceAmount - storeAmount) / 2);
                //App.game.features.beans.gain(plant.produceBean, collectedBeans);
                this.productionTime -= plant.produceTime(this);
            }
        } else {
            this.productionTime = 0;
        }
    }

    //#region Storage Status
    get isFull(): boolean {
        return this.storage >= this.data.storage(this);
    }

    get hasBeans(): boolean {
        return this.storage > 0;
    }

    get storagePercent(): number {
        return this.storage / this.data.storage(this);
    }

    get storageText(): string {
        const plant = this.data;
        return `${plant.produceBean}: ${this.storage}/${plant.storage(this)}`;
    }
    //#endregion

    //#region Produce Status
    get producePercent(): number {
        return this.productionTime / this.data.produceTime(this);
    }

    get produceLabel(): string {
        const plant = this.data;
        const gainedBeans = `${plant.produceAmount(this)} ${plant.produceBean}${Number(plant.produceAmount(this)) > 1 ? 's' : ''}`;
        return `Growing ${gainedBeans}`;
    }

    get produceText(): string {
        return `TODO: Growth timer`;
    }
    //#endregion


    get statuses(): Status[] {
        const statuses = super.statuses;

        // Including storage status
        if (this.hasBeans) {
            const storageStatus = new Status('Ripe Beans', this.storagePercent, this.storageText, 'pink');
            statuses.push(storageStatus);
        }

        // Including produce status
        if (!this.isFull) {
            const produceStatus = new Status(this.produceLabel, this.producePercent, this.produceText, 'green');
            statuses.push(produceStatus);
        }

        return statuses;
    }

    /**
     * Harvest the Beans on the plant.
     * @param amount The amount of Beans to harvest. If null defaults to all.
     */
    harvest(amount?: number): void {
        const plant = this.data;
        amount = amount ?? this.storage;
        App.game.features.beans.gain(plant.produceBean, amount);
        this.storage -= amount;
    }

    get data(): ProducePlant {
        return super.data as ProducePlant;
    }

    get image(): SVGData {
        if (this.hasBeans) {
            return super.image;
        } else {
            return getImage(`${this.data.name} Empty`);
        }
    }

    get modalTemplate(): string {
        return 'ProducePlantState';
    }

    save(): ProducePlantStateSaveData {
        return {
            ...super.save(),
            productionTime: this.productionTime,
            storage: this.storage,
        };
    }
    load(data: ProducePlantStateSaveData): void {
        super.load(data);
        this.productionTime = data.productionTime ?? 0;
        this.storage = data.storage ?? 0;
    }

}