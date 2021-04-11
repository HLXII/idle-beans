<template>
    <div class="flex flex-col border2 bg-generic" style="flex-grow: 1; height: 0px; min-height: 320px;">
        <div class="flex mb-1">
            <input class="border2 bg-white flex-1" style="min-width: 0;" v-model="controller.beanListSearch" placeholder="Filter Beans">
            <div v-if="false" class="ml-1" @click="toggleBeanFilter">
                <icon :image=beanFilterIcon class="has-tooltip" >
                    <tooltip position="top-right" :interactable="false">
                            <div class="border2 bg-generic text-center">{{beanfilterDescription}}</div>
                    </tooltip>
                </icon>
            </div>
        </div>
        <div class="overflow-auto" >
            <bean-entry v-for="bean in filteredList" :key="bean.name" :bean=bean :controller=controller></bean-entry>
        </div>
    </div>

</template>

<script>
import {App} from "@/App.ts"
import {ToolType, BeanListFilterType } from "@/scripts/GameController";
import BeanEntry from './bean-entry.vue';
import Icon from "@/controls/icon";
import Tooltip from "@/controls/tooltip";

export default {
    name: "bean-list",
    components: {
        BeanEntry,
        Icon,
        Tooltip,
    },
    data() {
        return {
            controller: App.game.features.controller,
            ToolType,
            BeanListFilterType,
        }
    },
    computed: {
        filteredList() {
            return this.controller.filteredList;
        },
        beanFilterIcon() {
            return require(`@/assets/images/icons/${this.BeanListFilterType[this.controller.beanListFilter]} Icon.png`);
        },
        beanfilterDescription() {
            console.log('des', this.controller.beanfilterDescription);
            return this.controller.beanfilterDescription;
        }
    },
    methods: {
        toggleBeanFilter() {
            this.controller.toggleBeanFilter();
        }
    }
}
</script>

<style scoped>

</style>
