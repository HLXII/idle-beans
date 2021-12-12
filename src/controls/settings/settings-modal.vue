<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
                <nav class="flex gap-1 mb-1">
                    <nav-button class="flex-1" tabName="Base" :tabType=0 :changeTab="changeTab" :activeTab="settingsTab"/>
                    <nav-button class="flex-1" tabName="Prestige" :tabType=1 :changeTab="changeTab" :activeTab="settingsTab"/>
                    <nav-button class="flex-1" tabName="Save" :tabType=2 :changeTab="changeTab" :activeTab="settingsTab"/>
                </nav>
            </div>
            <div class="modal-body">
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
                </nav-tab>
                <!-- Prestige-->
                <nav-tab :tabType="1" :activeTab="settingsTab">

                </nav-tab>
                <!-- Save -->
                <nav-tab :tabType="2" :activeTab="settingsTab">

                </nav-tab>
            </div>
            <div class="modal-footer">

            </div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal.vue";
import { App } from "@/App.ts"
import IconToggle from '@/controls/settings/icon-toggle.vue';
import NavButton from "@/controls/utility/nav-button.vue";
import NavTab from '../utility/nav-tab.vue';
import { TabType } from "@/scripts/GameController";

export default {
    name: "wiki-modal",
    data() {
        return {
            controller: App.game.features.controller,
            settings: App.game.features.settings,
        }
    },
    components: {
        Modal,
        IconToggle,
        NavButton,
        NavTab,
    },
    props: {
        show: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        close: function() {
            this.$emit('close');
        },
        changeTab: function(tab) {
            this.controller.changeTab(TabType.Settings, tab);
        },
    },
    computed: {
        settingsTab() {
            return this.controller.tabs[TabType.Settings];
        },
        darkMode() {
            return this.settings.getSetting('darkMode');
        },
    },
}
</script>

<style scoped>

</style>
