import Plot from "../farm/Plot";
import { PlantType } from "../plant/PlantList";
import Bean, { BeanOptions } from "./Bean";
import Plantable from "./Plantable";
import { BeanType } from "./BeanList";
import { App } from "@/App";

export default class PlantableBean extends Bean implements Plantable {
    
    constructor(name: string, public plantType: PlantType = 'Bean Bud', option?: BeanOptions) {
        super(name, option);
    }

    plant(plot: Plot) {
        // No Beans left
        if (!this.amount) {
            return false;
        }
        // Plot already has plant
        if (plot.plant) {
            return false;
        }

        // Planting Bean
        App.game.features.beans.gain(this.name as BeanType, -1);

        const plant = App.game.features.plants.list[this.plantType];
        const newPlant = plant.state();
        newPlant.originBean = this.name as BeanType;
        plot.plant = newPlant;

        // Unlocking state
        plant.unlock();
    }

}