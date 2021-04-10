<template>
    <div class="flex flex-col border2 bg-generic" style="flex-grow: 1; height: 0px; min-height: 320px;">
        <div class="mb-1 flex" style="height: 32px;">
            <input class="border2 bg-white flex-1" v-model="controller.beanListSearch" placeholder="Filter Beans">
            <div v-if="false" class="ml-1" @click="toggleBeanFilter">
                <icon :image=beanFilterIcon class="has-tooltip" >
                    <div class="tooltip left-0 w-56 mb-1" style="bottom: 100%;">
                        <div class="">
                            <div class="border2 bg-generic text-center">{{beanfilterDescription}}</div>
                        </div>
                    </div>
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

export default {
    name: "bean-list",
    components: {
        BeanEntry,
        Icon,
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
