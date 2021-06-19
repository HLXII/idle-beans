import { BooleanSetting, IgtSettings, Setting } from "incremental-game-template";

export class Settings extends IgtSettings {
    list: Setting[];

    darkMode: BooleanSetting;

    constructor() {
        super("settings");
        this.list = [];

        // Empty, will be overwritten in initialize()
        this.darkMode = {} as BooleanSetting;
    }

    initialize() {
        this.darkMode = this.registerSetting(new BooleanSetting('darkMode', 'Dark Mode', false));

        /*
        (value: SettingsValue) => {
            document.documentElement.setAttribute('data-theme', value ? 'darkMode' : '');
        })*/

        this.registerSetting(new BooleanSetting('displayPlantIcons', 'Display Plant Icons', false));
        this.registerSetting(new BooleanSetting('displayPlantStatus', 'Display Plant Status', true));
    }

}
