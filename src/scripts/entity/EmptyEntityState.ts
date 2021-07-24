import { PlantIcons, PlantImages, SVGData } from "../plant/PlantImages";
import EntityState from "./EntityState";
import Status from "./Status";

export default class EmptyEntityState extends EntityState {

    get statuses(): Status[] {
        return [];
    }

    get image(): SVGData {
        return PlantImages['Missing Plant'];
    }

    get icon(): SVGData {
        return PlantIcons['Missing Plant'];
    }

}