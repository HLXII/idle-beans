<template>
    <div class="prestigeView">
        <div id="left-column"  class="col-span-3">
            <div class="flex flex-col gap-1" style="height: 100%;">
                <!-- Info Icons -->
                <info-icons :controller="controller" :notifications="notifications" :settings="settings" :showPrestige="false" />
                <!-- Bean List -->
                <bean-list class="farmBeanList flex-grow" :list="controller.filteredBeanList" :useFilter="false" :focusable="false" />
                <!-- Seed Cart -->
                <seed-cart/>
                <button type="button" class="btn btn-red border2" v-on:click="startGame">
                    Start Game
                </button>
            </div>
        </div>
        <div id="right-column" class="col-span-7">
            <div class="flex flex-col gap-1" style="height: 100%;">
                <!-- Modal View Prestige Shop -->
                <div v-if="useModal" class="border2 bg-generic" style="height: 100%;">
                    <prestige-shop :controller="controller" :prestige="prestige" :wiki="wiki" :beans="beans" :upgrades="upgrades" />
                </div>
                <!-- Info View Prestige Shop -->
                <info-view v-if="!useModal"
                    :controller="controller" 
                    :farms="farms" 
                    :wiki="wiki" 
                    :prestige="prestige"
                    :settings="settings"
                    :beans="beans"
                    :plants="plants"
                    :notifications="notifications"
                    :upgrades="upgrades" />            
                </div>
        </div>
    </div>
</template>

<script>
import { Game } from '@/Game';
import BeanList from '../controller/beanlist/bean-list.vue';
import SeedCart from './seed-cart.vue';
import InfoIcons from '../controller/info-icons.vue';
import PrestigeShop from '../prestige-view/prestige-shop.vue';
import InfoView from '../info-view.vue';

export default {
    components: {
        BeanList,
        SeedCart,
        InfoIcons,
        PrestigeShop,
        InfoView,
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
        farms() {
            return this.game.features.farms;
        },
        prestige() {
            return this.game.features.prestige;
        },
        wiki() {
            return this.game.features.wiki;
        },
        notifications() {
            return this.game.features.notifications;
        },
        //#endregion

        useModal() {
            return this.settings.getSetting("useModal").value;
        },
    },
    methods: {
        startGame() {
            this.game.features.prestige.completePrestige();
        },
    },
}
</script>

<style>

.prestigeView {
    height: 100%;
    @apply grid grid-cols-10 p-1 gap-1 dark:bg-gray-900;
}

</style>
