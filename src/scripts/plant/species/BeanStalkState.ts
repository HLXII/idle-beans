import { BeanType } from "@/scripts/bean/BeanList";
import FarmLocation from "@/scripts/farm/FarmLocation";
import { BeanStalkCost } from "@/scripts/prestige/BeanStalkPrestige";
import { getOrthoPlots } from "../growths/plot/OrthoPlotsRequirement";
import { PlantType } from "../PlantList";
import PlantState, { PlantStateSaveData } from "../PlantState";
import PlantStatus from "../PlantStatus";
import ProducePlantState from "../ProducePlantState";
import BeanStalk from "./BeanStalk";

export interface BeanStalkStateSaveData extends PlantStateSaveData {
    consumptionTime: number;
    consumed: number;
}

export default class BeanStalkState extends PlantState {

    public consumptionTime: number;

    public consumed: number;

    constructor(name: PlantType, location?: FarmLocation) {
        super(name, location);

        this.consumed = 0;
        this.consumptionTime = 0;
    }

    /**
     * Updates the plant every game tick
     * @param delta The time passed (ms)
     */
    update(delta: number) {
        super.update(delta);

        this.consumptionTime += delta;
        if (this.consumptionTime >= this.data.consumeCooldown) {
            let consumed = false;

            // Pulling Beans from nearby plants
            const orthoPlots = getOrthoPlots(this.plot);
            for (const plot of orthoPlots) {
                if (!plot.plant) {
                    continue;
                }
                if (plot.plant instanceof ProducePlantState) {
                    if (plot.plant.hasBeans) {
                        plot.plant.harvest(1);
                        this.consumed += BeanStalkCost[plot.plant.data.produceBean];
                        consumed = true;
                    }
                }
            }

            if (consumed) {
                this.consumptionTime = 0;
            }
        }

    }

    /**
     * Calculates the current height of the Bean Stalk
     */
    get height(): number {
        return Math.floor(Math.log(this.consumed || 1));
    }

    get heightLabel(): string {
        return `Height (${this.height}):`;
    }

    get heightText(): string {
        const nextHeight = this.height + 1;
        const requiredConsume = Math.ceil(Math.pow(Math.E, nextHeight));
        const required = requiredConsume - this.consumed;
        return `${required} to next stage.`;
    }

    get heightPercent(): number {
        const nextHeight = this.height + 1;
        const requiredConsume = Math.ceil(Math.pow(Math.E, nextHeight));
        const previousConsume = Math.ceil(Math.pow(Math.E, this.height));
        const delta = this.consumed - previousConsume;
        return delta / (requiredConsume - previousConsume);
    }

    get consumptionPercent(): number {
        const percent = this.consumptionTime / this.data.consumeCooldown;
        return Math.min(1, Math.max(0, percent));
    }

    get statuses(): PlantStatus[] {
        const statuses = super.statuses;

        if (this.consumptionPercent < 1) {
            const consumeStatus: PlantStatus = {
                percent: this.consumptionPercent,
                tooltip: 'Consume Cooldown',
            }
            statuses.push(consumeStatus);
        }

        return statuses;
    }
    
    get data(): BeanStalk {
        return super.data as BeanStalk;
    }

    save(): BeanStalkStateSaveData {
        return {
            ...super.save(),
            consumptionTime: this.consumptionTime,
            consumed: this.consumed,
        };
    }
    load(data: BeanStalkStateSaveData): void {
        super.load(data);
        this.consumptionTime = data.consumptionTime ?? 0;
        this.consumed = data.consumed ?? 0;
    }
}