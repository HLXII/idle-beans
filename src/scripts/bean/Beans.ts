
import { SaveData, AbstractField, IgtFeature } from "incremental-game-template";
import Bean, { BeanSaveData } from "./Bean";
import { BeanType, BeanList, BeanAmount } from "./BeanList";

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
    canAccess(): boolean {
        return true;
    }

    /**
     * Checks whether this BeanAmount can be taken from the inventory
     * @param beans The BeanAmount
     * @returns True if there are enough beans in storage, False otherwise.
     */
    canAfford(beans: BeanAmount): boolean {
        return Object.entries(beans).every(([bean, amount]) => {
            return this.list[bean as BeanType].amount >= (amount ?? 0);
        });
    }

    /**
     * Takes away the Beans from storage
     * @param beans The BeanAmount
     */
    takeAmount(beans: BeanAmount) {
        Object.entries(beans).forEach(([bean, amount]) => {
            this.gain(bean as BeanType, -(amount ?? 0));
        });
    }

    /**
     * Gains this amount of Beans
     * @param beans The BeanAmount
     */
    gainAmount(beans: BeanAmount) {
        Object.entries(beans).forEach(([bean, amount]) => {
            this.gain(bean as BeanType, (amount ?? 0));
        });
    }

    /**
     * Gain this amount of a Bean. Can be used with negative amounts to take away Beans.
     * @param beanType The BeanType
     * @param amount The amount to modify the storage by. Can be negative.
     */
    gain(beanType: BeanType, amount: number = 1) {
        const bean = this.list[beanType];
        bean.amount += amount;

        if (amount > 0) {
            bean.unlock();
        }
    }

    /**
     * Helper function to obtain Beans via some filter
     * @param filter The filter function
     * @returns A list of Beans
     */
    filter(filter: (bean: Bean) => boolean): Bean[] {
        return Object.values(this.list).filter(filter);
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
        Object.keys(this.list).forEach((beanType) => {
            this.list[beanType as BeanType].load(data[beanType]);
        });
    }

}
