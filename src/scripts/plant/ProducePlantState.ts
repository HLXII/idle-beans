import { App } from "@/App";
import FarmLocation from "../farm/FarmLocation";
import { PlantType } from "./PlantList";
import PlantState, { PlantStateSaveData } from "./PlantState";
import PlantStatus from "./PlantStatus";
import ProducePlant from "./ProducePlant";

export interface ProducePlantStateSaveData extends PlantStateSaveData {
    productionTime: number;
}

export default class ProducePlantState extends PlantState {

    public productionTime: number;

    constructor(name: PlantType, location?: FarmLocation) {
        super(name, location);

        this.productionTime = 0;
    }

    /**
     * Updates the plant every game tick
     * @param delta The time passed (ms)
     */
    update(delta: number) {
        super.update(delta);

        // Handling production
        const plant = this.data as ProducePlant;
        this.productionTime += delta;
        if (this.productionTime >= plant.produceTime) {
            App.game.features.beans.gain(plant.produceBean, plant.produceAmount);
            this.productionTime -= plant.produceTime;
        }

    }

    get producePercent(): number {
        return this.productionTime / (this.data as ProducePlant).produceTime;
    }

    get produceText(): string {
        const plant = this.data as ProducePlant;
        const gainedBeans = `${plant.produceAmount} ${plant.produceBean}${Number(plant.produceAmount) > 1 ? 's' : ''}`;
        return `Growing ${gainedBeans}`;
    }

    get statuses(): PlantStatus[] {
        const statuses = super.statuses;

        // Including produce status
        const produceStatus: PlantStatus = {
            percent: this.producePercent,
            tooltip: this.produceText,
        }
        statuses.push(produceStatus);
        return statuses;
    }

    save(): ProducePlantStateSaveData {
        return {
            ...super.save(),
            productionTime: this.productionTime,
        };
    }
    load(data: ProducePlantStateSaveData): void {
        super.load(data);
        this.productionTime = data.productionTime ?? 0;
    }

}