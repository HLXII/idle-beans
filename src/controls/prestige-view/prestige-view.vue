<template>
    <div class="prestigeView">
        <div id="left-column">
            <div class="flex flex-col gap-1" style="height: 100%;">
                <div style="height: 192px;"></div>
                <bean-list class="farmBeanList" :list="game.features.controller.filteredBeanList" :useFilter="false" :focusable="false"></bean-list>
            </div>
        </div>
        <div id="middle-column" class="col-span-2 justify-self-center px-2" style="width:100%;">
                <div class="border2 bg-generic" style="min-height:560px;">
                    <div>
                        <nav class="flex gap-1 mb-1">
                            <nav-button class="flex-1" tabName="Bean Packets" :tabType=0 :changeTab="changeShopTab" :activeTab="shopTab"/>
                            <nav-button class="flex-1" tabName="Bean Trees" :tabType=1 :changeTab="changeShopTab" :activeTab="shopTab"/>
                        </nav>
                    </div>
                    <div>
                        <!-- Bean Packets Tab -->
                        <nav-tab :activeTab="shopTab" :tabType=0>
                            <div class="flex flex-cols-4 gap-1 justify-center">
                                <seed-packet v-for="packet in beanPackets" :key="packet.name" :packet="packet" :prestige="prestige" :wiki="wiki" :selected="prestige.selectedBeanPackets.includes(packet.name)"/>
                            </div>
                        </nav-tab>
                        <!-- Bean Trees Tab -->
                        <nav-tab :activeTab="shopTab" :tabType=1>
                            <!-- TODO: -->
                            <bean-tree :beans="beans" :upgrades="upgrades" :selectedBean="beans.list['Bean']" />
                        </nav-tab>
                    </div>
                </div>
        </div>
        <div id="right-column">
            <div class="flex flex-col gap-1" style="height: 100%;">
                <div class="flex flex-col-reverse" style="height: 192px;">
                    <!-- Additional Icons -->
                    <div class="flex flex-wrap gap-1 justify-center">
                        <div class="btn" style="height:32px;" @click="openModal(ModalType.Wiki)">
                            <icon class="has-tooltip" :image="require(`@/assets/images/icons/Wiki Icon.png`)">
                                <tooltip position="top-left" :interactable="false">
                                <div class="text-center">Wiki</div>
                                </tooltip>
                            </icon>
                        </div>
                        <div class="btn" style="height:32px;" @click="openModal(ModalType.Achievements)">
                            <icon class="has-tooltip" :image="require(`@/assets/images/icons/Achievement Icon.png`)">
                                <tooltip position="top-left" :interactable="false">
                                <div class="text-center">Achievements</div>
                                </tooltip>
                            </icon>
                        </div>
                        <div class="btn" style="height:32px;" @click="openModal(ModalType.Settings)">
                            <icon class="has-tooltip" :image="require(`@/assets/images/icons/Settings Icon.png`)">
                                <tooltip position="top-left" :interactable="false">
                                <div class="text-center">Settings</div>
                                </tooltip>
                            </icon>
                        </div>
                    </div>
                </div>
                <seed-cart/>
                <button type="button" class="btn btn-red border2" v-on:click="startGame">
                    Start Game
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ModalType, TabType } from '@/scripts/GameController';
import { Game } from '@/Game';
import BeanList from '../controller/beanlist/bean-list.vue';
import Icon from '@/controls/utility/icon.vue';
import Tooltip from '@/controls/utility/tooltip.vue';
import NavButton from "@/controls/utility/nav-button.vue";
import NavTab from '../utility/nav-tab.vue';
import SeedCart from './seed-cart.vue';
import { PlantCategory } from '@/scripts/plant/PlantList';
import SeedPacket from './seed-packet.vue';
import BeanTree from '../upgrades/bean-tree.vue';

export default {
    components: {
        BeanList,
        Icon,
        Tooltip,
        NavButton,
        NavTab,
        SeedCart,
        SeedPacket,
        BeanTree,
    },
    data() {
        return {
            ModalType,
            PlantCategory,
        }
    },
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    computed: {
        //#region Features
        settings() {
            return this.game.features.settings;
        },
        controller() {
            return this.game.features.controller;
        },
        upgrades() {
            return this.game.features.upgrades;
        },
        beans() {
            return this.game.features.beans;
        },
        plants() {
            return this.game.features.plants;
        },
        prestige() {
            return this.game.features.prestige;
        },
        wiki() {
            return this.game.features.wiki;
        },
        //#endregion
        shopTab() {
            return this.controller.tabs[TabType.PrestigeShop];
        },
        plantTab() {
            return this.controller.tabs[TabType.PrestigePlant];
        },
        beanPackets() {
            return Object.values(this.prestige.beanPackets).filter((packet) => packet.requirement.isCompleted);
        },
        plantList() {
            return this.controller.prestigePlantList;
        },
        plantCats() {
            return this.controller.prestigePlantCats;
        },
        plant() {
            return this.plants.list[this.controller.prestigePlant];
        },
    },
    methods: {
        startGame() {
            this.game.features.prestige.completePrestige();
        },
        openModal(modalType) {
            this.controller.openModal(modalType);
        },
        closeModal() {
            this.controller.closeModal();
        },
        changeShopTab(tab) {
            this.controller.changeTab(TabType.PrestigeShop, tab);
        },
        changePlantTab(tab) {
            this.controller.changeTab(TabType.PrestigePlant, tab);
        },
        changePlant(plantType) {
            this.controller.changePrestigePlant(plantType);
        },
    },
}
</script>

<style>
.prestigeView {
    margin: auto;
    max-width: 1600px;
    @apply grid grid-cols-4 dark:bg-gray-900;
}
</style>
