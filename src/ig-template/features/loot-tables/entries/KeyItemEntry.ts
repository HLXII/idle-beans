import {AbstractLootEntry} from "@/ig-template/features/loot-tables/entries/AbstractLootEntry";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {IntRange} from "@/ig-template/tools/probability/IntRange";
import {KeyItems} from "@/ig-template/features/key-items/KeyItems";
import {KeyItemLoot} from "@/ig-template/features/loot-tables/rewards/KeyItemLoot";
import {KeyItem} from "@/ig-template/features/key-items/KeyItem";

export class KeyItemEntry extends AbstractLootEntry {
    _keyItems: KeyItems;
    item: KeyItem;

    constructor(item: KeyItem, KeyItems: KeyItems, weight: number = 1, requirement: Requirement = new NoRequirement()) {
        super(weight, new IntRange(1, 1), requirement);
        this.item = item;
        this._keyItems = KeyItems;
    }

    getLoot(): KeyItemLoot[] {
        if (!this.canGet()) {
            console.warn(`Tried to get loot ${this.item}, but the requirements were not met`);
            return [];
        }
        return [new KeyItemLoot(this.item, this._keyItems)];
    }

}
