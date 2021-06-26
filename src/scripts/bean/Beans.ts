
import { Features } from "@/Features";
import { SaveData, AbstractField, IgtFeature } from "incremental-game-template";
import Bean, { BeanSaveData } from "./Bean";
import { BeanType, BeanList, BeanCategory } from "./BeanList";

interface BeansSaveData extends SaveData {
    [key: string]: BeanSaveData;
}

export default class Beans extends IgtFeature {

    public list: Record<BeanType, Bean> = BeanList;

    constructor() {
        super('beans');
    }

    getDeveloperPanelFields(): AbstractField[] {
        // TODO
        return [];
    }
    initialize(features: Features): void {
        return;   
    }
    start(): void {
        return;
    }
    stop(): void {
        return;
    }
    canAccess(): boolean {
        return true;
    }
    update(delta: number): void {
        return;
    }

    gain(beanType: BeanType, amount: number = 1) {
        const bean = this.list[beanType];
        bean.amount += amount;

        if (amount > 0) {
            bean.unlocked = true;
        }
    }

    catIsVisible(category: BeanCategory) {
        return Object.values(this.list).filter((bean) => {
            if (bean.category !== category) {
                return false;
            }
            return bean.unlocked;
        }).length > 0;
    }

    saveKey = 'beans';
    save(): BeansSaveData {
        const data: BeansSaveData = {};
        Object.values(this.list).map((bean) => {
            data[bean.name] = bean.save();
        });
        return data;
    }
    load(data: BeansSaveData): void {
        Object.entries(data).map(([beanType, beanData]) => {
            this.list[beanType as BeanType].load(beanData);
        });
    }

}
