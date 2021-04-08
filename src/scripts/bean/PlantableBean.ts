import { App } from "@/App";
import { FarmType } from "../farm/FarmType";
import { PlantType } from "../plant/PlantList";
import Bean, { BeanOptions } from "./Bean";
import { BeanType } from "./BeanList";
import Plantable from "./Plantable";


export default class PlantableBean extends Bean implements Plantable {
    
    constructor(name: string, public plantType: PlantType = 'Bean Bud', option?: BeanOptions) {
        super(name, option);
    }

    plant(farm: FarmType, row: number, col: number) {
        // No Beans left
        if (!this.amount) {
            return false;
        }
        // Plot already has plant
        const prevPlant = App.game.features.farms.getPlant(row, col, farm);
        if (prevPlant) {
            return false;
        }

        // Removing Bean
        App.game.features.beans.gain(this.name as BeanType, -1);

        // Creating new state
        const plant = App.game.features.plants.list[this.plantType];
        const newPlant = plant.state({farm: farm, row: row, col: col});
        newPlant.originBean = this.name as BeanType;

        // Planting Bean
        App.game.features.farms.addPlant(newPlant, row, col, farm);

        // Unlocking state
        plant.unlock();
    }

}