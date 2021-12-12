import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";

export default class GreenBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Green Bean Plant.',
    ];

    public produceBean: BeanType = 'Green Bean';
    public baseProduceAmount = 2;
    public baseProduceTime = 20;
    public baseStorage = 10;

}