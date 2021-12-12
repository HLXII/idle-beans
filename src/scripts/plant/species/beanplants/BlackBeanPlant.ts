import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";

export default class BlackBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Black Bean Plant.',
    ];

    public produceBean: BeanType = 'Black Bean';
    public baseProduceAmount = 2;
    public baseProduceTime = 20;
    public baseStorage = 10;

}