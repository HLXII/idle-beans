import LegumaPlant from "./LegumaPlant";
import PlantState from "./PlantState";

export default class LegumaPlantState extends PlantState {

    update(delta: number) {
        super.update(delta);

        // Leguma
        this.plot.leguma += delta * this.data.legumaProduce(this);
    }
    
    get data(): LegumaPlant {
        return super.data as LegumaPlant;
    }

}