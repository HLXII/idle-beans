import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";

export default class WhiteBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple White Bean Plant.',
    ];

    public produceBean: BeanType = 'White Bean';
    public baseProduceAmount = 2;
    public baseProduceTime = 20;
    public baseStorage = 10;

}