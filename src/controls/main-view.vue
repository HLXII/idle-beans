<template>
    <div :class="mainViewClass">
        <div id="left-column" class="col-span-3 lg:col-span-2">
            <div class="flex flex-col gap-1" style="height: 100%;">
                <!-- Info Icons -->
                <info-icons :controller="controller" :notifications="notifications" :settings="settings"/>
                <!-- Bean List -->
                <bean-list class="farmBeanList flex-grow" :list="controller.filteredBeanList" :useFilter="true" ></bean-list>
                <!-- Log -->
                <log></log>
            </div>
        </div>
        <div id="middle-column" class="col-span-7 lg:col-span-5">
            <div class="flex flex-col gap-1" style="height:100%;">
                <div class="border2 flex-shrink flex flex-col" :style="farmStyle">
                    <!-- Title -->
                    <div style="height: 192px; pointer-events: none;">
                        <div style="max-width: 640px; margin:auto;">
                            <img :src="require(`@/assets/images/Title.png`)" style="width:100%;padding:0px 32px;"/>
                        </div>
                    </div>
                    <!-- Farm -->
                    <div class="mx-2 mb-2" style="min-height: 0;">
                        <div style="aspect-ratio:1;max-width:100%;max-height:100%;margin: auto;">
                            <farm></farm>
                        </div>
                    </div>
                    <!-- Tool Icons -->
                    <div class="position: absolute">
                        <tool-icons></tool-icons>
                    </div>
                </div>
                <!-- Farm Info -->
                <div class="">
                    <farm-control></farm-control>

                </div>
                <!-- Dev Panel -->
                <igt-developer-panel v-if="showDevPanel" :developerPanel="game.getDeveloperPanel()"/>
            </div>
        </div>
        <div id="right-column" class="col-span-10 lg:col-span-5" v-show="!useModal">
            <div class="flex flex-col gap-1" style="height: 100%;">
                <info-view 
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
import {App} from "@/App.ts"

import {InfoType} from '@/scripts/GameController';

import ToolIcons from '@/controls/controller/tool-icons/tool-icons.vue';
import BeanList from '@/controls/controller/beanlist/bean-list.vue';
import Farm from '@/controls/farm/farm.vue';
import Log from '@/controls/log/log.vue';
import FarmControl from "@/controls/farm/farm-control.vue";
import { Game } from '@/Game';
import IgtDeveloperPanel from '@/components/developer-panel/igt-developer-panel.vue';
import InfoView from './info-view.vue';
import InfoIcons from './controller/info-icons.vue';

export default {
    components: {
        ToolIcons,
        BeanList,
        Farm,
        Log,
        FarmControl,
        IgtDeveloperPanel,
        InfoView,
        InfoIcons,
    },
    data() {
        return {
            InfoType,
        }
    },
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    computed: {
        showDevPanel() {
            return !App.inProduction;
        },
        darkMode() {
            return this.game.features.settings.getSetting('darkMode').value;
        },
        useModal() {
            return this.game.features.settings.getSetting('useModal').value;
        },

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

        farmStyle() {
            return {
                'background-size': 'cover',
                'background-origin': 'border-box',
                'background-repeat': 'no-repeat',
                'background-image': this.farms.getFarm().background,
                'image-rendering': 'pixelated',
                'height': '60vh',
            };
        },

        mainViewClass() {
            if (this.useModal) {
                return 'mainView lg:grid-cols-7';
            } else {
                return 'mainView lg:grid-cols-12';
            }
        },
    },
    methods: {
        openInfo(infoType) {
            this.controller.openInfo(infoType);
        },
    },
}
</script>

<style>

.mainView {
    height: 100%;
    @apply grid grid-cols-10 p-1 gap-1 dark:bg-gray-900;
}

.farmBeanList {
    flex-grow: 1;
    height: 0px;
    min-height: 320px;
}

</style>
