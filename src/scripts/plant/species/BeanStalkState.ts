import { BeanStalkCost } from "@/scripts/bean/BeanList";
import FarmLocation from "@/scripts/farm/FarmLocation";
import { getOrthoPlots } from "../growths/plot/OrthoPlotsRequirement";
import { getImage, SVGData } from "../PlantImages";
import { PlantType } from "../PlantList";
import PlantState, { PlantStateSaveData } from "../PlantState";
import Status from "../../entity/Status";
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

        this.consumed = 1;
        this.consumptionTime = 0;
    }

    update(delta: number) {
        super.update(delta);

        this.consumptionTime += delta;
        if (this.consumptionTime >= this.data.consumeCooldown) {
            let consumed = false;

            // Pulling Beans from nearby plants
            const orthoPlots = getOrthoPlots(this.plot);
            for (const plot of orthoPlots) {
                if (!plot.entity) {
                    continue;
                }
                if (plot.entity instanceof ProducePlantState) {
                    if (plot.entity.hasBeans) {
                        plot.entity.storage -= 1;
                        this.consumed += BeanStalkCost[plot.entity.data.produceBean];
                        consumed = true;
                    }
                }
            }

            if (consumed) {
                this.consumptionTime = 0;
            }
        }

    }

    //#region Height Status
    get height(): number {
        return Math.floor(Math.log(this.consumed || 1));
    }

    get heightLabel(): string {
        return `Height (${this.height})`;
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
    //#endregion

    //#region Consumption Cooldown
    get consumptionPercent(): number {
        const percent = this.consumptionTime / this.data.consumeCooldown;
        return Math.min(1, Math.max(0, percent));
    }

    get consumptionText(): string {
        return 'TODO: Cooldown timer text';
    }
    //#endregion

    get statuses(): Status[] {
        const statuses = super.statuses;

        if (this.consumptionPercent < 1) {
            const consumeStatus = new Status('Consume Cooldown', this.consumptionPercent, this.consumptionText, 'green');
            statuses.push(consumeStatus);
        }

        const heightStatus = new Status(this.heightLabel, this.heightPercent, this.heightText, 'yellow');
        statuses.push(heightStatus);

        return statuses;
    }
    
    get image(): SVGData {
        if (this.height >= 10) {
            return getImage('Bean Stalk Heavens');
        } else if (this.height >= 5) {
            return getImage('Bean Stalk Grown');
        } else if (this.height >= 3) {
            return getImage('Bean Stalk Adult');
        } else if (this.height >= 1) {
            return getImage('Bean Stalk Juvenile');
        } else {
            return getImage('Bean Stalk Infant')
        }
    }

    get data(): BeanStalk {
        return super.data as BeanStalk;
    }

    get modalTemplate(): string {
        return 'BeanStalkState';
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
        this.consumed = data.consumed ?? 1;
    }
}