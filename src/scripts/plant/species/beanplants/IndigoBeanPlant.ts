import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";

export default class IndigoBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Indigo Bean Plant.',
    ];

    public produceBean: BeanType = 'Indigo Bean';
    public baseProduceAmount = 2;
    public baseProduceTime = 20;
    public baseStorage = 10;

}