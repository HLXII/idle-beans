import { BooleanSetting, IgtSettings, Setting } from "incremental-game-template";

export class Settings extends IgtSettings {
    list: Setting[];
    
    constructor() {
        super("settings");
        this.list = [];

    }

    initialize() {
        this.registerSetting(new BooleanSetting('darkMode', 'Dark Mode', false));

        this.registerSetting(new BooleanSetting('useModal', 'Use Modals', false));
        // TODO: Setup onChange to close or open Settings Modal

        this.registerSetting(new BooleanSetting('displayPlantIcons', 'Display Plant Icons', false));
        this.registerSetting(new BooleanSetting('displayPlantStatus', 'Display Plant Status', true));

        this.registerSetting(new BooleanSetting('displayPurchasedUpgrades', 'Display Purchased Upgrades', true));
    }

}
