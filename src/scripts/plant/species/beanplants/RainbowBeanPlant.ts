import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";

export default class RainbowBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Rainbow Bean Plant.',
    ];

    public produceBean: BeanType = 'Rainbow Bean';
    public baseProduceAmount = 2;
    public baseProduceTime = 20;
    public baseStorage = 10;

}