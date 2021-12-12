import { BeanType } from "@/scripts/bean/BeanList";
import { GameText } from "@/scripts/controls/GameText";
import { WikiType } from "@/scripts/wiki/WikiType";
import ProducePlant from "../../ProducePlant";

export default class SoyBeanPlant extends ProducePlant {
    
    baseDescription: GameText[] = [
        'Inexpensive and produces the very versatile ',
        {text: 'Soy Bean', type: WikiType.Bean, id: 'Soy Bean'},
        '. One of the more common Plants that are genetically modified due to this.',
    ];

    public produceBean: BeanType = 'Soy Bean';
    public baseProduceAmount = 5;
    public baseProduceTime = 100;
    public baseStorage = 40;

}