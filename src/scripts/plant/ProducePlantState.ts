import { App } from "@/App";
import FarmLocation from "../farm/FarmLocation";
import { getImage, SVGData } from "./PlantImages";
import { PlantType } from "./PlantList";
import PlantState, { PlantStateSaveData } from "./PlantState";
import PlantStatus from "./PlantStatus";
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

    /**
     * Updates the plant every game tick
     * @param delta The time passed (ms)
     */
    update(delta: number) {
        super.update(delta);

        
        const plant = this.data;

        if (!this.isFull) {
            // Handling production
            this.productionTime += delta;
            if (this.productionTime >= plant.produceTime) {
                const produceAmount = plant.produceAmount;
                // Storing on Plant if there is space
                const storeAmount = Math.min(plant.holdCap - this.storage, produceAmount);
                this.storage += storeAmount;
    
                // Collecting extra Beans at a lower rate
                const collectedBeans = Math.floor((produceAmount - storeAmount) / 2);
                App.game.features.beans.gain(plant.produceBean, collectedBeans);
                this.productionTime -= plant.produceTime;
            }
        } else {
            this.productionTime = 0;
        }
    }

    get isFull(): boolean {
        return this.storage >= this.data.holdCap;
    }

    get hasBeans(): boolean {
        return this.storage > 0;
    }

    get storagePercent(): number {
        return this.storage / this.data.holdCap;
    }

    get producePercent(): number {
        return this.productionTime / this.data.produceTime;
    }

    get produceText(): string {
        const plant = this.data;
        const gainedBeans = `${plant.produceAmount} ${plant.produceBean}${Number(plant.produceAmount) > 1 ? 's' : ''}`;
        return `Growing ${gainedBeans}`;
    }

    get storageText(): string {
        if (this.storage === 0) {
            return '';
        }
        const plant = this.data;
        return `Grown Beans: ${this.storage}/${plant.holdCap}`;
    }

    get statuses(): PlantStatus[] {
        const statuses = super.statuses;

        const storageStatus: PlantStatus = {
            percent: this.storagePercent,
            tooltip: this.storageText,
        }
        statuses.push(storageStatus);

        // Including produce status
        if (!this.isFull) {
            const produceStatus: PlantStatus = {
                percent: this.producePercent,
                tooltip: this.produceText,
            }
            statuses.push(produceStatus);
        }

        return statuses;
    }

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
            return getImage(`${super.image} Unripe`);
        }
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