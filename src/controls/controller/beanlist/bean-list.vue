<template>
    <div class="flex flex-col border2 bg-generic" style="flex-grow: 1; height: 0px; min-height: 320px;">
        <div class="flex mb-1">
            <input class="border2 bg-white flex-1" style="min-width: 0;" v-model="controller.beanListSearch" placeholder="Filter Beans">
        </div>
        <div class="overflow-auto">
            <bean-entry v-for="bean in filteredList" :key="bean.name" :bean=bean :controller=controller></bean-entry>
        </div>
    </div>

</template>

<script>
import {App} from "@/App.ts"
import {ToolType } from "@/scripts/GameController";
import BeanEntry from './bean-entry.vue';

export default {
    name: "bean-list",
    components: {
        BeanEntry,
    },
    data() {
        return {
            controller: App.game.features.controller,
            ToolType,
        }
    },
    computed: {
        filteredList() {
            return this.controller.filteredList;
        },
    },
    methods: {
    }
}
</script>

<style scoped>

</style>
