import { BeanType } from "@/scripts/bean/BeanList";
import { GameText } from "@/scripts/controls/GameText";
import ProducePlant from "../../ProducePlant";

export default class MungBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'A staple Plant in some regions where other protein sources are scarce.',
    ];

    public produceBean: BeanType = 'Mung Bean';
    public baseProduceAmount = 10;
    public baseProduceTime = 110;
    public baseStorage = 50;

}