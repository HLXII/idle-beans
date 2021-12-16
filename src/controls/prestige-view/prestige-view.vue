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
                            <nav-button class="flex-1" tabName="General" :tabType=0 :changeTab="changeShopTab" :activeTab="shopTab"/>
                            <nav-button class="flex-1" tabName="Bean Packets" :tabType=1 :changeTab="changeShopTab" :activeTab="shopTab"/>
                            <nav-button class="flex-1" tabName="Plant Upgrades" :tabType=2 :changeTab="changeShopTab" :activeTab="shopTab"/>
                        </nav>
                    </div>
                    <div>
                        <!-- General Tab -->
                        <nav-tab :activeTab="shopTab" :tabType=0>
                            <div class="flex flex-cols-4 gap-1 justify-center">
                                <upgrade v-for="upgrade in upgradeList" :key="upgrade.name" :upgrade="upgrade" :upgrades="upgrades" :wiki="wiki" :beans="beans"/>
                            </div>
                            <div v-if="upgradeList.length == 0">
                                All available Upgrades purchased!
                            </div>
                        </nav-tab>
                        <!-- Bean Packets Tab -->
                        <nav-tab :activeTab="shopTab" :tabType=1>
                            <div class="flex flex-cols-4 gap-1 justify-center">
                                <seed-packet v-for="packet in beanPackets" :key="packet.name" :packet="packet" :prestige="prestige" :wiki="wiki" :selected="prestige.selectedBeanPackets.includes(packet.name)"/>
                            </div>
                        </nav-tab>
                        <!-- Plant Upgrades Tab -->
                        <nav-tab :activeTab="shopTab" :tabType=2>
                            <nav class="flex gap-1 mb-1" v-if="plantCats.length > 1">
                                <nav-button class="flex-1" v-for="cat in plantCats" :key="cat" :tabName="PlantCategory[cat]" :tabType="cat" :changeTab="changePlantTab" :activeTab="plantTab"/>
                            </nav>
                            <div class="grid grid-cols-3 gap-2" style="height: 640px;" v-if="plantCats.length > 0">
                                <div class="border2 bg-generic">
                                    <wiki-entry v-for="plant in plantList" :key="plant.name" :id="plant.elementName" :entry=plant :controller=controller :activeEntry="controller.prestigePlant" :change="changePlant"></wiki-entry>
                                </div>
                                <div class="border2 bg-generic col-span-2 flex flex-col gap-1">
                                    <plant-upgrade v-for="upgrade in plantUpgrades" :key="upgrade.id" :plant="plant" :upgrade="upgrade"
                                        :controller="controller" :plants="plants" :beans="beans" :wiki="wiki"/>
                                </div>
                            </div>
                            <div v-if="plantCats.length == 0">
                                All available Plant Upgrades purchased!
                            </div>
                        </nav-tab>
                    </div>
                </div>
        </div>
        <div id="right-column">
            <div class="flex flex-col gap-1" style="height: 100%;">
                <div class="flex flex-col-reverse" style="height: 192px;">
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
import { InfoType, TabType } from '@/scripts/GameController';
import { Game } from '@/Game';
import BeanList from '../controller/beanlist/bean-list.vue';
import NavButton from "@/controls/utility/nav-button.vue";
import NavTab from '../utility/nav-tab.vue';
import Upgrade from './upgrade.vue';
import SeedCart from './seed-cart.vue';
import { PlantCategory } from '@/scripts/plant/PlantList';
import PlantUpgrade from './plant-upgrade.vue';
import SeedPacket from './seed-packet.vue';
import WikiEntry from '../wiki/wiki-entry.vue';

export default {
    components: {
        BeanList,
        NavButton,
        NavTab,
        Upgrade,
        SeedCart,
        PlantUpgrade,
        SeedPacket,
        WikiEntry,
    },
    data() {
        return {
            InfoType,
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
        upgradeList() {
            return Object.values(this.upgrades.list).filter((upgrade) => {
                if (!this.settings.getSetting('displayPurchasedUpgrades').value && upgrade.purchased) {
                    return false;
                }
                if (!upgrade.visible) {
                    return false;
                }
                return true;
            });
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
        plantUpgrades() {
            return this.plant.upgrades.filter((upgrade) => {
                if (!this.settings.getSetting('displayPurchasedUpgrades').value && upgrade.purchased) {
                    return false;
                }

                return upgrade.visible(this.plant);
            });
        },
    },
    methods: {
        startGame() {
            this.game.features.prestige.completePrestige();
        },
        openInfo(infoType) {
            this.controller.openInfo(infoType);
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
