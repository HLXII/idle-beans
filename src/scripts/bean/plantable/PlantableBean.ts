import { App } from "@/App";
import { FarmType } from "@/scripts/farm/FarmType";
import { PlantType } from "@/scripts/plant/PlantList";
import Bean, { BeanOptions } from "../Bean";
import { BeanCategory, BeanType } from "../BeanList";
import NoPlantRequirement from "./NoPlantRequirement";
import Plantable from "./Plantable";
import PlantRequirement from "./PlantRequirement";


export default class PlantableBean extends Bean implements Plantable {
    
    constructor(name: string, description: string, category: BeanCategory, public plantType: PlantType = 'Bean Bud', public plantRequirement: PlantRequirement = new NoPlantRequirement(), option?: BeanOptions) {
        super(name, description, category, option);
    }

    plant(farm: FarmType, row: number, col: number): boolean {
        // No Beans left
        if (!this.amount) {
            return false;
        }
        // Plot already has plant
        const prevPlant = App.game.features.farms.getPlant(row, col, farm);
        if (prevPlant) {
            return false;
        }

        // Checking Plot requirements
        if (!this.plantRequirement.canPlant(farm ,row, col)) {
            return false
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

        return true;
    }

}