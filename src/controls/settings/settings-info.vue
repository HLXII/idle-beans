<template>
    <div>
        <!-- Base -->
        <nav-tab :tabType="0" :activeTab="settingsTab">
            <div class="grid grid-cols-2">
                <div>Dark Mode:</div>
                <div class="flex">
                    <icon-toggle :setting="darkMode"
                    :trueIcon="require(`@/assets/images/icons/Dark Mode Icon.png`)"
                    :falseIcon="require(`@/assets/images/icons/Light Mode Icon.png`)"
                    :trueTooltip="`Dark Mode`"
                    :falseTooltip="`Light Mode`"></icon-toggle>
                </div>
            </div>
            <div class="grid grid-cols-2">
                <div>Use Modals:</div>
                <div class="flex">
                    <icon-toggle :setting="useModal"
                    :trueIcon="require(`@/assets/images/icons/Dark Mode Icon.png`)"
                    :falseIcon="require(`@/assets/images/icons/Light Mode Icon.png`)"
                    :trueTooltip="`Dark Mode`"
                    :falseTooltip="`Light Mode`"></icon-toggle>
                </div>
            </div>
        </nav-tab>
        <!-- Prestige-->
        <nav-tab :tabType="1" :activeTab="settingsTab">
            <div class="grid grid-cols-2">
                <div>Display Purchased Upgrades:</div>
                <div class="flex">
                    <icon-toggle :setting="displayPurchasedUpgrades"
                    :trueIcon="require(`@/assets/images/icons/Eye Icon.png`)"
                    :falseIcon="require(`@/assets/images/icons/No Eye Icon.png`)"
                    :trueTooltip="`Displaying Purchased Upgrades`"
                    :falseTooltip="`Hiding Purchased Upgrades`"></icon-toggle>
                </div>
            </div>
        </nav-tab>
        <!-- Save -->
        <nav-tab :tabType="2" :activeTab="settingsTab">

        </nav-tab>
    </div>
</template>

<script>
import IconToggle from '@/controls/settings/icon-toggle.vue';
import NavTab from '../utility/nav-tab.vue';
import GameController, { TabType } from "@/scripts/GameController";
import { Settings } from '@/scripts/Settings';

export default {
    name: "settings-info",
    components: {
        IconToggle,
        NavTab,
    },
    props: {
        controller: {
            type: GameController,
            required: true,
        },
        settings: {
            type: Settings,
            required: true,
        },
    },
    methods: {
        
    },
    computed: {
        settingsTab() {
            return this.controller.tabs[TabType.Settings];
        },
        darkMode() {
            return this.settings.getSetting('darkMode');
        },
        useModal() {
            return this.settings.getSetting('useModal');
        },
        displayPurchasedUpgrades() {
            return this.settings.getSetting('displayPurchasedUpgrades');
        },
    },
}
</script>

<style scoped>

</style>
