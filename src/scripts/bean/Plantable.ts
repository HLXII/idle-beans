import { FarmType } from '../farm/FarmType';
import { PlantType } from '../plant/PlantList';

export default interface Plantable {

    plantType: PlantType;

    plant: (farm: FarmType, row: number, col: number) => void;

}

export function isPlantable(object: any): object is Plantable {
    return 'plant' in object;
}