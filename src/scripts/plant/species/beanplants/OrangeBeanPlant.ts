import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";

export default class OrangeBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Orange Bean Plant.',
    ];

    public produceBean: BeanType = 'Orange Bean';
    public baseProduceAmount = 2;
    public baseProduceTime = 25;
    public baseStorage = 20;

}