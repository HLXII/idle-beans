import { AbstractField } from "@/ig-template/developer-panel/fields/AbstractField";
import { Features } from "@/ig-template/Features";
import { Feature } from "@/ig-template/features/Feature";
import { SaveData } from "@/ig-template/tools/saving/SaveData";
import Bean, { BeanSaveData } from "./Bean";
import { BeanType, BeanList } from "./BeanList";

interface BeansSaveData extends SaveData {
    [key: string]: BeanSaveData;
}

export default class Beans implements Feature {

    public list: Record<BeanType, Bean> = BeanList;

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
            bean.globalUnlocked = true;
        }
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
