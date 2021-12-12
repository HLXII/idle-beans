import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";

export default class RedBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Red Bean Plant.',
    ];

    public produceBean: BeanType = 'Red Bean';
    public baseProduceAmount = 1;
    public baseProduceTime = 15;
    public baseStorage = 16;

}