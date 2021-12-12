import { GameText } from "@/scripts/controls/GameText";
import { BeanType } from "../../../bean/BeanList";
import ProducePlant from "../../ProducePlant";

export default class BlueBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Just a simple Blue Bean Plant.',
    ];

    public produceBean: BeanType = 'Blue Bean';
    public baseProduceAmount = 2;
    public baseProduceTime = 20;
    public baseStorage = 10;

}