import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";

export default class BeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Bean Plant.',
    ];

    public produceBean: BeanType = 'Bean';
    public baseProduceAmount = 1;
    public baseProduceTime = 10;
    public baseStorage = 15;


}