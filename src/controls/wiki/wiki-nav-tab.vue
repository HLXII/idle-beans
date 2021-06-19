<template>
    <button v-bind:class="['nav-button', 'border2', active ? 'nav-button-active': '']" @click="changeTab">{{tabName}}</button>
</template>

<script>
import GameController from "@/scripts/GameController";

export default {
    name: "wiki-nav-tab",
    props: {
        tabName: {
            type: String,
            required: true,
        },
        tabType: {
            type: Number,
            required: true,
        },
        controller: {
            type: GameController,
            required: true,
        }
    },
    methods: {
        changeTab() {
            this.controller.changeTab(this.tabType);
        }
    },
    computed: {
        active() {
            return this.tabType == this.controller.wikiTab;
        },
    },
}
</script>

<style scoped>
.nav-button {
    @apply text-gray-600 block mr-2 hover:text-blue-500 focus:outline-none;
}
.nav-button-active {
    @apply text-blue-500 border-blue-500;
}
</style>
