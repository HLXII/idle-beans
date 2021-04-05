import Plot from '../farm/Plot';
import { PlantType } from '../plant/PlantList';

export default interface Plantable {

    plantType: PlantType;

    plant: (plot: Plot) => void;

}

export function isPlantable(object: any): object is Plantable {
    return 'plant' in object;
}