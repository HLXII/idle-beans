<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
                <nav class="flex gap-1 mb-1">
                    <nav-button class="flex-1" tabName="Prestige" :tabType=0 :changeTab="changeTab" :activeTab="controller.prestigeTab"/>
                    <nav-button class="flex-1" tabName="Modifiers" :tabType=1 :changeTab="changeTab" :activeTab="controller.prestigeTab"/>
                </nav>
            </div>
            <div class="modal-body">
                <nav-tab :activeTab="controller.prestigeTab" :tabType=0>
                    <div>
                        TODO: Figure out description for prestige
                    </div>
                    <prestige v-for="(prestige, idx) in visiblePrestiges" :key="idx" :prestige="prestige" :controller="controller"/>
                </nav-tab>
                <nav-tab :activeTab="controller.prestigeTab" :tabType=1>

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
import NavButton from '../wiki/nav-button.vue';
import NavTab from '../wiki/nav-tab.vue';

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
        changeTab: function(tabType) {
            this.controller.changePrestigeTab(tabType);
        },
    },
    computed: {
        visiblePrestiges() {
            return this.prestige.prestiges.filter((prestige) => prestige.visible);
        }
    },
}
</script>

<style scoped>
</style>
