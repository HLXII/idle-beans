<template>
    <div class="prestigeView">
        <div id="left-column">
            <div class="flex flex-col gap-1" style="height: 100%;">
                <div style="height: 192px;"></div>
                <bean-list class="farmBeanList" :list="game.features.controller.filteredBeanList" :useFilter="false" :focusable="false"></bean-list>
            </div>
        </div>
        <div id="middle-column" class="col-span-2 justify-self-center px-2" style="width:100%;">
                <div class="border2 bg-generic">
                    <div>
                        <nav class="flex gap-1 mb-1">
                            <nav-button class="flex-1" tabName="General" :tabType=0 :changeTab="changeTab" :activeTab="controller.prestigeShopTab"/>
                            <nav-button class="flex-1" tabName="Bean Packets" :tabType=1 :changeTab="changeTab" :activeTab="controller.prestigeShopTab"/>
                            <nav-button class="flex-1" tabName="Plant Upgrades" :tabType=2 :changeTab="changeTab" :activeTab="controller.prestigeShopTab"/>
                        </nav>
                    </div>
                    <div>
                        <nav-tab :activeTab="controller.prestigeShopTab" :tabType=0>
                            <div>
                                TODO: Add General Shop
                            </div>
                        </nav-tab>
                        <nav-tab :activeTab="controller.prestigeShopTab" :tabType=1>
                            <div>
                                TODO: Add Seed Packet Shop
                            </div>
                        </nav-tab>
                        <nav-tab :activeTab="controller.prestigeShopTab" :tabType=2>
                            <div>
                                TODO: Add Upgrade Shop
                            </div>
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
                <!-- Log -->
                <log/>
                <button type="button" class="btn btn-red border2" v-on:click="startGame">
                    Start Game
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {ModalType} from '@/scripts/GameController';
import { Game } from '@/Game';
import BeanList from './controller/beanlist/bean-list.vue';
import Icon from '@/controls/utility/icon.vue';
import Tooltip from '@/controls/utility/tooltip.vue';
import Log from './log/log.vue';
import NavButton from './wiki/nav-button.vue';
import NavTab from './wiki/nav-tab.vue';

export default {
    components: {
        BeanList,
        Icon,
        Tooltip,
        Log,
        NavButton,
        NavTab
    },
    data() {
        return {
            ModalType,
        }
    },
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    computed: {
        controller() {
            return this.game.features.controller;
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
        changeTab(tab) {
            this.controller.changePrestigeShopTab(tab);
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
