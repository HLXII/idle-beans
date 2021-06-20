import { BeanType } from "@/scripts/bean/BeanList";
import FarmLocation from "@/scripts/farm/FarmLocation";
import { PlantType } from "../PlantList";
import PlantState, { PlantStateSaveData } from "../PlantState";
import PlantStatus from "../PlantStatus";

export interface BeanStalkStateSaveData extends PlantStateSaveData {

}

export default class BeanStalkState extends PlantState {

    public consumed!: number;

    constructor(name: PlantType, location?: FarmLocation) {
        super(name, location);

    }

    /**
     * Updates the plant every game tick
     * @param delta The time passed (ms)
     */
    update(delta: number) {
        super.update(delta);

        // TODO: Figure out how to handle consumed updating
    }

    /**
     * Calculates the current height of the Bean Stalk
     */
    get height(): number {
        // TODO: Calculate height based on consumed Beans
        return 1;
    }

    get statuses(): PlantStatus[] {
        const statuses = super.statuses;


        return statuses;
    }
    
    save(): BeanStalkStateSaveData {
        return {
            ...super.save(),
        };
    }
    load(data: BeanStalkStateSaveData): void {
        super.load(data);
    }
}