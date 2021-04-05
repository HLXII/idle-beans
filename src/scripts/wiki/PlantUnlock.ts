import { PlantType } from "../plant/PlantList";

export default interface PlantUnlock {
    plant: PlantType;
    visible: boolean;
    description: string;
}