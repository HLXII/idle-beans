<template>
    <div class="flex flex-col gap-1" style="height:100%;">
        <div>
            <nav class="flex gap-1 mb-1">
                <nav-button class="flex-1" tabName="Bean Packets" :tabType=0 :changeTab="changeShopTab" :activeTab="shopTab"/>
                <nav-button class="flex-1" tabName="Bean Trees" :tabType=1 :changeTab="changeShopTab" :activeTab="shopTab"/>
            </nav>
        </div>
        <div class="flex flex-col gap-1 flex-grow">
            <!-- Bean Packets Tab -->
            <nav-tab :activeTab="shopTab" :tabType=0>
                <div class="flex flex-cols-4 gap-1 justify-center">
                    <seed-packet v-for="packet in beanPackets" :key="packet.name" :packet="packet" :prestige="prestige" :wiki="wiki" :selected="prestige.selectedBeanPackets.includes(packet.name)"/>
                </div>
            </nav-tab>
            <!-- Bean Trees Tab -->
            <nav-tab :activeTab="shopTab" :tabType=1 class="flex-grow">
                <bean-tree :beans="beans" :upgrades="upgrades" :wiki="wiki" :selectedBean="beans.list['Bean']" />
            </nav-tab>
        </div>
    </div>
</template>

<script>
import GameController, { InfoType, TabType } from '@/scripts/GameController';
import NavButton from "@/controls/utility/nav-button.vue";
import NavTab from '../utility/nav-tab.vue';
import { PlantCategory } from '@/scripts/plant/PlantList';
import SeedPacket from './seed-packet.vue';
import BeanTree from '../upgrades/bean-tree.vue';
import PrestigeHandler from '@/scripts/prestige/PrestigeHandler';
import Wiki from '@/scripts/wiki/Wiki';
import Upgrades from '@/scripts/upgrade/Upgrades';
import Beans from '@/scripts/bean/Beans';

export default {
    name: 'prestige-shop',
    components: {
        NavButton,
        NavTab,
        SeedPacket,
        BeanTree,
    },
    data() {
        return {
            InfoType,
            PlantCategory,
        }
    },
    props: {
        controller: {
            type: GameController,
            required: true,
        },
        prestige: {
            type: PrestigeHandler,
            required: true,
        },
        wiki: {
            type: Wiki,
            required: true,
        },
        upgrades: {
            type: Upgrades,
            required: true,
        },
        beans: {
            type: Beans,
            required: true,
        },
    },
    computed: {
        shopTab() {
            return this.controller.tabs[TabType.PrestigeShop];
        },
        beanPackets() {
            return Object.values(this.prestige.beanPackets).filter((packet) => packet.requirement.isCompleted);
        },
    },
    methods: {
        startGame() {
            this.prestige.completePrestige();
        },
        openInfo(infoType) {
            this.controller.openInfo(infoType);
        },
        changeShopTab(tab) {
            this.controller.changeTab(TabType.PrestigeShop, tab);
        },
    },
}
</script>

<style>

.prestigeView {
    @apply grid grid-cols-10 p-1 gap-1 dark:bg-gray-900;
}

</style>
