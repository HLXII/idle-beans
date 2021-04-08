import { FarmType } from "./FarmType";

export default interface FarmLocation {
    farm: FarmType;
    row: number;
    col: number;
}