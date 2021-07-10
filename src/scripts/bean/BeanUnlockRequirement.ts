import { App } from "@/App";
import { Requirement } from "incremental-game-template";
import { BeanType } from "./BeanList";

export default class BeanUnlockRequirement extends Requirement {
    
    public bean: BeanType[];

    constructor(bean: BeanType | BeanType[]) {
        super();
        if (Array.isArray(bean)) {
            this.bean = bean;
        } else {
            this.bean = [bean];
        }
    }
    
    get hint(): string {
        return '';
    }
    get actualValue(): number {
        return this.bean.filter((bean) => App.game.features.beans.list[bean as BeanType].unlocked).length;
    }
    get targetValue(): number {
        return this.bean.length;
    }

}