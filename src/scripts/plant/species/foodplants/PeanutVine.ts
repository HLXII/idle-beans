import { BeanType } from "@/scripts/bean/BeanList";
import { GameText } from "@/scripts/controls/GameText";
import ProducePlant from "../../ProducePlant";

export default class PeanutVine extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Grows stalks that bend low towards the soil so the seed pods grow underground.',
    ];

    public produceBean: BeanType = 'Peanut';
    public baseProduceAmount = 10;
    public baseProduceTime = 110;
    public baseStorage = 50;

}