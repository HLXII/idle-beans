import {Feature} from "@/ig-template/features/Feature";
import {SettingsSaveData} from "@/ig-template/features/settings/SettingsSaveData";
import {Setting} from "@/ig-template/features/settings/Setting";
import {SettingId} from "@/ig-template/features/settings/SettingId";
import {MultipleChoiceSetting} from "@/ig-template/features/settings/MultipleChoiceSetting";
import {SettingOption} from "@/ig-template/features/settings/SettingOption";
import {BooleanSetting} from "@/ig-template/features/settings/BooleanSetting";
import {SettingsValue} from "@/ig-template/features/settings/SettingsValueType";

export class Settings extends Feature {
    list: Setting[];

    darkMode: BooleanSetting;

    constructor() {
        super("settings");
        this.list = [];

        // Empty, will be overwritten in initialize()
        this.darkMode = {} as BooleanSetting;
    }

    registerSetting<T extends Setting>(setting: T): T {
        if (!this.getSetting(setting.id)) {
            this.list.push(setting);
        }
        return setting;
    }

    initialize() {
        this.darkMode = this.registerSetting(new BooleanSetting(SettingId.DarkMode, "Dark Mode", true));

        this.registerSetting(new BooleanSetting(SettingId.DisplayPlantIcons, 'Display Plant Icons', false));
    }

    setSetting(id: SettingId, value: SettingsValue) {
        const setting = this.getSetting(id);
        if (setting) {
            setting.set(value);
        } else {
            console.warn(`Setting ${id} does not exist`);
        }

    }

    getSetting<T extends Setting>(id: SettingId): T | null {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id == id) {
                return this.list[i] as T;
            }
        }
        return null;
    }


    load(data: SettingsSaveData): void {
        for (const settingSave of data.list) {
            this.getSetting(settingSave.id)?.set(settingSave.value);
        }
    }

    save(): SettingsSaveData {

        return {
            list: this.list.map(setting => {
                return {
                    id: setting.id,
                    value: setting.value
                }
            })
        }

    }
}
