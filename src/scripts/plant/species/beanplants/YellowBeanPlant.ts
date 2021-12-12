import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";

export default class YellowBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Yellow Bean Plant.',
    ];

    public produceBean: BeanType = 'Yellow Bean';
    public baseProduceAmount = 3;
    public baseProduceTime = 30;
    public baseStorage = 12;

}