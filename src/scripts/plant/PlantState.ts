import { App } from "@/App";
import { BeanAmount, BeanType } from "../bean/BeanList";
import { GameText } from "../controls/GameText";
import EntityState, { EntityStateSaveData } from "../entity/EntityState";
import FarmLocation from "../farm/FarmLocation";
import GameHelper from "../GameHelper";
import { EntryType } from "../log/Log";
import Plant from "./Plant";
import { getImage, SVGData } from "./PlantImages";
import { PlantType } from './PlantList';
import Status from "../entity/Status";
import { WikiType } from "../wiki/WikiType";

export interface PlantStateSaveData extends EntityStateSaveData {
    type: PlantType;
    originBean: BeanType;
}

export default class PlantState extends EntityState {

    /** Type of Plant for this state */
    public type: PlantType;

    /** Original Bean used to grow this Plant */
    public originBean: BeanType;

    constructor(type: PlantType, location?: FarmLocation) {
        super(location);

        this.type = type;
        this.originBean = 'Bean';
    }

    get statuses(): Status[] {
        return [];
    }

    /**
     * Handles harvesting this Plant
     */
    handleRemove() {
        // Gaining harvest cost
        const removeGain = this.removeGain;
        App.game.features.beans.gainAmount(removeGain);
        
        // Logging harvest
        const gainedBeans = GameHelper.beanAmount(removeGain, ', ');
        App.game.features.log.log([
            `Removed a `,
            {text: this.type, type: WikiType.Plant, id: this.type},
            '. Gained: ',
            ...gainedBeans,
        ], EntryType.Removal);
    }

    get removeGain(): BeanAmount {
        return this.data.removeGain(this);
    }

    get removeGainMessage(): GameText[] {
        const message = [];
        message.push('Harvesting this plant will return:<br>');
        message.push(...GameHelper.beanAmount(this.removeGain));
        return message;
    }

    /**
     * Returns the Plant object associated with this PlantState
     */
    get data(): Plant {
         return App.game.features.plants.list[this.type];
    }

    /**
     * Returns the Plant image SVGData
     */
    get image(): SVGData {
        return getImage(this.data.name);
    }

    /**
     * Returns the Plant Icon SVGData
     */
    get icon(): SVGData {
        return this.data.icon;
    }

    get modalTemplate(): string {
        return 'PlantState';
    }

    //#region Save
    saveKey = '';
    save(): PlantStateSaveData {
        return {
            ...super.save(),
            type: this.type,
            originBean: this.originBean,
        };
    }
    load(data: PlantStateSaveData): void {
        super.load(data);
        this.type = data.type ?? 'Bean Bud';
        this.originBean = data.originBean ?? 'Bean';
    }
    //#endregion

}