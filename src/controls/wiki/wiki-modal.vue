<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
                <nav class="flex mb-2">
                    <wiki-nav-tab class="flex-1" tabName="Beans" :tabType=0 :changeTab="changeTab" :activeTab="controller.wikiTab"></wiki-nav-tab>
                    <wiki-nav-tab class="flex-1" tabName="Plants" :tabType=1 :changeTab="changeTab" :activeTab="controller.wikiTab"></wiki-nav-tab>
                </nav>
            </div>
            <div class="modal-body">
                <wiki-tab :tabType="0" :activeTab="controller.wikiTab">
                    <nav class="flex mb-2" v-if="beanCats.length > 1">
                        <wiki-nav-tab v-for="cat in beanCats" :key="cat" :tabName="BeanCategory[cat]" :tabType="cat" :changeTab="changeBeanTab" :activeTab="controller.beanTab"></wiki-nav-tab>
                    </nav>
                    <div class="grid grid-cols-3 gap-2" style="height: 640px;">
                        <div class="border2">
                            <wiki-bean-entry v-for="bean in beanList" :key="bean.name" :id="bean.elementName" :bean=bean :controller=controller></wiki-bean-entry>
                        </div>
                        <div class="border2 col-span-2 p-1">
                            <div>
                                <div class="float-left mb-2 mr-2">
                                    <div class="border4">
                                        <img :src="bean.image" width=64px />
                                    </div>
                                </div>
                                <div class="beanName">{{bean.name}}</div>
                                <div class="beanDescription">{{bean.description}}</div>
                            </div>
                        </div>
                    </div>
                </wiki-tab>
                <wiki-tab :tabType="1" :activeTab="controller.wikiTab">
                    <nav class="flex mb-2" v-if="plantCats.length > 1">
                        <wiki-nav-tab v-for="cat in plantCats" :key="cat" :tabName="PlantCategory[cat]" :tabType="cat" :changeTab="changePlantTab" :activeTab="controller.plantTab"></wiki-nav-tab>
                    </nav>
                    <div class="grid grid-cols-3 gap-2" style="height: 640px;">
                        <div class="border2">
                            <wiki-plant-entry v-for="plant in plantList" :key="plant.name" :id="plant.elementName" :plant=plant :controller=controller></wiki-plant-entry>
                        </div>
                        <div class="border2 col-span-2 p-1">
                            <div class="overflow-auto">
                                <div class="float-left mb-2 mr-2">
                                    <div class="border4">
                                        <svg width=64px xmlns="http://www.w3.org/2000/svg" :viewBox="plant.icon.viewBox" shape-rendering="crispEdges">
                                            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
                                            <path v-for="path in plant.icon.paths" v-bind:key="path.stroke" pointer-events="painted" :stroke="path.stroke" :d="path.d" />
                                        </svg>    
                                    </div>
                                </div>
                                <div class="plantName">{{plant.name}}</div>
                                <div class="plantDescription">{{plant.description}}</div>
                            </div>
                            <div v-if="visibleGrowths.length > 0">
                                <h1>Growths</h1>
                                <wiki-growth v-for="growth in visibleGrowths" :key="`growth_${growth.plant}`" :growth="growth" :controller="controller"/>
                            </div>
                        </div>
                    </div>
                </wiki-tab>
            </div>
            <div class="modal-footer">

            </div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal.vue";
import {App} from "@/App.ts"
import WikiNavTab from "@/controls/wiki/wiki-nav-tab.vue";
import WikiTab from '@/controls/wiki/wiki-tab.vue';
import WikiBeanEntry from '@/controls/wiki/wiki-bean-entry.vue';
import WikiPlantEntry from '@/controls/wiki/wiki-plant-entry.vue';
import WikiGrowth from './wiki-growth.vue';

import { BeanCategory } from "@/scripts/bean/BeanList";
import { PlantCategory } from "@/scripts/plant/PlantList";

export default {
    name: "wiki-modal",
    data() {
        return {
            plants: App.game.features.plants,
            beans: App.game.features.beans,
            controller: App.game.features.controller,
            BeanCategory,
            PlantCategory,
        }
    },
    components: {
        Modal,
        WikiNavTab,
        WikiTab,
        WikiBeanEntry,
        WikiPlantEntry,
        WikiGrowth,
    },
    props: {
        show: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        close: function() {
            this.$emit('close');
        },
        changeTab: function(tabType) {
            this.controller.changeTab(tabType);
        },
        changeBeanTab: function(tabType) {
            this.controller.changeBeanTab(tabType);
        },
        changePlantTab: function(tabType) {
            this.controller.changePlantTab(tabType);
        },
    },
    computed: {
        beanList() {
            return this.controller.wikiBeanList;
        },
        bean() {
            return this.beans.list[this.controller.wikiBean];
        },
        plantList() {
            return this.controller.wikiPlantList;

        },
        plant() {
            return this.plants.list[this.controller.wikiPlant];
        },
        visibleGrowths() {
            if (this.plant.growths) {
                return this.plant.growths.filter((growth) => growth.visible);
            }
            return [];
        },
        beanCats() {
            return Object.values(this.BeanCategory).filter((val) => {
                if (isNaN(val)) {
                    return false;
                }
                return this.beans.catIsVisible(val);
            });
        },
        plantCats() {
            return Object.values(this.PlantCategory).filter((val) => {
                if (isNaN(val)) {
                    return false;
                }
                return this.plants.catIsVisible(val);
            });        
        },
    },
}
</script>

<style scoped>
</style>
