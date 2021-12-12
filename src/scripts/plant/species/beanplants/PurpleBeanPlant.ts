import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";

export default class PurpleBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Purple Bean Plant.',
    ];

    public produceBean: BeanType = 'Purple Bean';
    public baseProduceAmount = 2;
    public baseProduceTime = 20;
    public baseStorage = 10;

}