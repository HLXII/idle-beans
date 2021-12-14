<template>
    <div>
        <!-- Prestiges -->
        <nav-tab :activeTab="prestigeTab" :tabType=0>
            <div v-if="visiblePrestiges.length == 0">
                Currently no available prestiges.
            </div>
            <prestige v-for="(prestige, idx) in visiblePrestiges" :key="idx" :prestige="prestige" :wiki="wiki"/>
        </nav-tab>
        <!-- Prestige Modifiers -->
        <nav-tab :activeTab="prestigeTab" :tabType=1>

        </nav-tab>
    </div>
</template>

<script>
import Prestige from './prestige.vue';
import NavTab from '../utility/nav-tab.vue';
import GameController, { TabType } from "@/scripts/GameController";
import Wiki from '@/scripts/wiki/Wiki';
import PrestigeHandler from '@/scripts/prestige/PrestigeHandler';

export default {
    name: "prestige-info",

    components: {
        Prestige,
        NavTab,
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
    },
    methods: {

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
