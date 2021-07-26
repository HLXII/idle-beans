import { App } from "@/App";
import { GameText } from "@/scripts/controls/GameText";
import GameHelper from "@/scripts/GameHelper";
import { WikiType } from "@/scripts/wiki/Wiki";
import { BeanType } from "../../bean/BeanList";
import GrowthPlantState from "../GrowthPlantState";
import GrowthRequirement from "./GrowthRequirement";

export default class OriginBeanRequirement extends GrowthRequirement {

    public bean: BeanType[];

    constructor(bean: BeanType | BeanType[], _description?: GameText[]) {
        super(_description);

        // Collapsing bean parameter
        if (!Array.isArray(bean)) {
            bean = [bean];
        }
        this.bean = bean;
    }

    public growthCheck(state: GrowthPlantState): boolean {
        return this.bean.includes(state.originBean);
    }

    public visible(): boolean {
        return this.bean.some((bean) => App.game.features.beans.list[bean].unlocked);
    }

    get description(): GameText[] {

        const beanText: GameText[][] = this.bean.map((bean) => {
            return [{text: `${bean}`, type: WikiType.Bean, id: bean}]
        });

        return [
            'The plant grew from a ',
            ...GameHelper.gameTextList(beanText),
        ]
    }

}