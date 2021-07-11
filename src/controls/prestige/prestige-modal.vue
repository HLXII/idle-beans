<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
                <nav class="flex gap-1 mb-1">
                    <nav-button class="flex-1" tabName="Prestige" :tabType=0 :changeTab="changeTab" :activeTab="prestigeTab"/>
                    <nav-button class="flex-1" tabName="Modifiers" :tabType=1 :changeTab="changeTab" :activeTab="prestigeTab"/>
                </nav>
            </div>
            <div class="modal-body">
                <!-- Prestiges -->
                <nav-tab :activeTab="prestigeTab" :tabType=0>
                    <div v-if="visiblePrestiges.length == 0">
                        Currently no available prestiges.
                    </div>
                    <prestige v-for="(prestige, idx) in visiblePrestiges" :key="idx" :prestige="prestige" :controller="controller"/>
                </nav-tab>
                <!-- Prestige Modifiers -->
                <nav-tab :activeTab="prestigeTab" :tabType=1>

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
import Prestige from './prestige.vue';
import NavButton from "@/controls/utility/nav-button.vue";
import NavTab from '../utility/nav-tab.vue';
import { TabType } from "@/scripts/GameController";

export default {
    name: "prestige-modal",
    data() {
        return {
            prestige: App.game.features.prestige,
            controller: App.game.features.controller,
        }
    },
    components: {
        Modal,
        Prestige,
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
            this.controller.changeTab(TabType.Prestige, tab);
        },
    },
    computed: {
        prestigeTab() {
            return this.controller.tabs[TabType.Prestige];
        },
        visiblePrestiges() {
            return this.prestige.prestiges.filter((prestige) => prestige.visible);
        }
    },
}
</script>

<style scoped>
</style>
