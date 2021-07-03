<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
                <nav class="flex gap-1 mb-1">
                    <nav-button class="flex-1" tabName="Base" :tabType=0 :changeTab="changeTab" :activeTab="controller.settingsTab"/>
                    <nav-button class="flex-1" tabName="Save" :tabType=1 :changeTab="changeTab" :activeTab="controller.settingsTab"/>
                </nav>
            </div>
            <div class="modal-body">
                <nav-tab :tabType="0" :activeTab="controller.settingsTab">
                    <icon-toggle :setting="darkMode"
                    :trueIcon="require(`@/assets/images/icons/Status Bar Icon.png`)"
                    :falseIcon="require(`@/assets/images/icons/No Status Bar Icon.png`)"
                    :trueTooltip="`Dark Mode`"
                    :falseTooltip="`Light Mode`"></icon-toggle>
                </nav-tab>
                <nav-tab :tabType="1" :activeTab="controller.settingsTab">

                </nav-tab>
            </div>
            <div class="modal-footer">

            </div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal.vue";
import {App} from "@/App.ts"
import IconToggle from '@/controls/settings/icon-toggle.vue';
import NavButton from '../wiki/nav-button.vue';
import NavTab from '../wiki/nav-tab.vue';

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
        changeTab: function(tabType) {
            this.controller.changeSettingsTab(tabType);
        },
    },
    computed: {
        darkMode() {
            return this.settings.getSetting('darkMode');
        }
    },
}
</script>

<style scoped>

</style>
