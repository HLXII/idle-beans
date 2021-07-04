<template>
    <div class="flex flex-col gap-1 border2 bg-generic">
        <div v-if="useFilter" class="flex">
            <input class="border2 bg-white dark:bg-gray-700 flex-1 focus:outline-none" style="min-width: 0;" v-model="controller.beanListSearch" placeholder="Filter Beans">
        </div>
        <div class="flex flex-col gap-1 overflow-auto">
            <bean-entry v-for="bean in list" :key="bean.name" :bean=bean :controller=controller :focusable="focusable"></bean-entry>
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
    props: {
        useFilter: {
            type: Boolean,
            default: false,
        },
        focusable: {
            type: Boolean,
            default: true,
        },
        list: {
            type: Array,
        },
    },
    computed: {
    },
    methods: {
    }
}
</script>

<style scoped>

</style>
