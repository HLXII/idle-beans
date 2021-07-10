<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
                <nav class="flex gap-1 mb-1">
                    <nav-button class="flex-1" tabName="Beans" :tabType=0 :changeTab="changeTab" :activeTab="wikiTab"/>
                    <nav-button class="flex-1" tabName="Plants" :tabType=1 :changeTab="changeTab" :activeTab="wikiTab"/>
                </nav>
            </div>
            <div class="modal-body">
                <!-- Bean Tab -->
                <nav-tab :tabType="0" :activeTab="wikiTab">
                    <nav class="flex gap-1 mb-1" v-if="beanCats.length > 1">
                        <nav-button v-for="cat in beanCats" :key="cat" :tabName="BeanCategory[cat]" :tabType="cat" :changeTab="changeBeanTab" :activeTab="beanTab"/>
                    </nav>
                    <div class="grid grid-cols-3 gap-2" style="height: 640px;">
                        <div class="border2 bg-generic">
                            <wiki-bean-entry v-for="bean in beanList" :key="bean.name" :id="bean.elementName" :bean=bean :controller=controller></wiki-bean-entry>
                        </div>
                        <div class="border2 bg-generic col-span-2 p-1">
                            <div>
                                <div class="float-left mb-2 mr-2">
                                    <div class="border4 bg-icon">
                                        <img :src="bean.image" width=64px />
                                    </div>
                                </div>
                                <div class="beanName">{{bean.name}}</div>
                                <div class="beanDescription">{{bean.description}}</div>
                            </div>
                        </div>
                    </div>
                </nav-tab>
                <!-- Plant Tab -->
                <nav-tab :tabType="1" :activeTab="wikiTab">
                    <nav class="flex gap-1 mb-1" v-if="plantCats.length > 1">
                        <nav-button v-for="cat in plantCats" :key="cat" :tabName="PlantCategory[cat]" :tabType="cat" :changeTab="changePlantTab" :activeTab="plantTab"/>
                    </nav>
                    <div class="grid grid-cols-3 gap-2" style="height: 640px;">
                        <div class="border2 bg-generic">
                            <wiki-plant-entry v-for="plant in plantList" :key="plant.name" :id="plant.elementName" :plant=plant :controller=controller :activePlant="controller.wikiPlant" :changePlant="changeWikiPlant"></wiki-plant-entry>
                        </div>
                        <div class="border2 bg-generic col-span-2 p-1">
                            <div class="overflow-auto">
                                <div class="float-left mb-2 mr-2">
                                    <div class="border4 bg-icon">
                                        <svg width=64px xmlns="http://www.w3.org/2000/svg" :viewBox="plant.icon.viewBox" shape-rendering="crispEdges">
                                            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
                                            <path v-for="path in plant.icon.paths" v-bind:key="path.stroke" pointer-events="painted" :stroke="path.stroke" :d="path.d" />
                                        </svg>    
                                    </div>
                                </div>
                                <div class="plantName">{{plant.name}}</div>
                                <game-text :text="plant.description" :controller="controller"/>
                            </div>
                            <div>
                                <nav class="flex gap-1 mb-1">
                                    <nav-button class="flex-1" v-if="visibleGrowths.length > 0" tabName="Growths" :tabType=0 :changeTab="changePlantDetailsTab" :activeTab="plantDetailsTab"/>
                                    <nav-button class="flex-1" v-if="purchasedUpgrades.length > 0" tabName="Upgrades" :tabType=1 :changeTab="changePlantDetailsTab" :activeTab="plantDetailsTab"/>
                                </nav>
                            </div>
                            <nav-tab class="flex flex-col gap-1" :tabType="0" :activeTab="plantDetailsTab">
                                <wiki-growth v-for="growth in visibleGrowths" :key="`growth_${growth.plant}`" :growth="growth" :plants="plants" :controller="controller"/>
                            </nav-tab>
                            <nav-tab class="flex flex-col gap-1" :tabType="1" :activeTab="plantDetailsTab">
                                <plant-upgrade v-for="upgrade in purchasedUpgrades" :key="upgrade.id" :plant="plant" :upgrade="upgrade" :displayOnly="true" :controller="controller" :plants="plants" :beans="beans"/>
                            </nav-tab>
                        </div>
                    </div>
                </nav-tab>
            </div>
            <div class="modal-footer">

            </div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal.vue";
import { App } from "@/App.ts"
import NavButton from "@/controls/utility/nav-button.vue";
import NavTab from '@/controls/utility/nav-tab.vue';
import WikiBeanEntry from '@/controls/wiki/wiki-bean-entry.vue';
import WikiPlantEntry from '@/controls/wiki/wiki-plant-entry.vue';
import WikiGrowth from './wiki-growth.vue';

import { BeanCategory } from "@/scripts/bean/BeanList";
import { PlantCategory } from "@/scripts/plant/PlantList";
import GameText from '@/controls/utility/game-text.vue';
import { TabType } from "@/scripts/GameController";
import PlantUpgrade from '../prestige-view/plant-upgrade.vue';

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
        NavButton,
        NavTab,
        WikiBeanEntry,
        WikiPlantEntry,
        WikiGrowth,
        GameText,
        PlantUpgrade,
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
        changeTab: function(tab) {
            this.controller.changeTab(TabType.Wiki, tab);
        },
        changeBeanTab: function(tab) {
            this.controller.changeTab(TabType.WikiBean, tab);
        },
        changePlantTab: function(tab) {
            this.controller.changeTab(TabType.WikiPlant, tab);
        },
        changePlantDetailsTab: function(tab) {
            this.controller.changeTab(TabType.WikiPlantDetails, tab);
        },
        changeWikiPlant: function(plantType) {
            this.controller.changeWikiPlant(plantType);
        },
    },
    computed: {
        wikiTab() {
            return this.controller.tabs[TabType.Wiki];
        },
        beanList() {
            return this.controller.wikiBeanList;
        },
        bean() {
            return this.beans.list[this.controller.wikiBean];
        },
        beanTab() {
            return this.controller.tabs[TabType.WikiBean];
        },
        plantList() {
            return this.controller.wikiPlantList;
        },
        plant() {
            return this.plants.list[this.controller.wikiPlant];
        },
        plantTab() {
            return this.controller.tabs[TabType.WikiPlant];
        },
        plantDetailsTab() {
            return this.controller.tabs[TabType.WikiPlantDetails];
        },
        visibleGrowths() {
            if (this.plant.growths) {
                return this.plant.growths.filter((growth) => growth.visible);
            }
            return [];
        },
        purchasedUpgrades() {
            if (this.plant.upgrades) {
                return this.plant.upgrades.filter((upgrade) => upgrade.purchased);
            }
            return [];
        },
        beanCats() {
            return Object.values(this.BeanCategory).filter((val) => {
                if (isNaN(val)) {
                    return false;
                }
                return this.controller.filterBeans((bean) => {
                    if (bean.category !== val) {
                        return false;
                    }
                    return bean.unlocked;
                }).length > 0;
            });
        },
        plantCats() {
            return Object.values(this.PlantCategory).filter((val) => {
                if (isNaN(val)) {
                    return false;
                }
                return this.controller.filterPlants((plant) => {
                    if (plant.category !== val) {
                        return false;
                    }
                    return plant.unlocked;
                }).length > 0;
            });        
        },
    },
}
</script>

<style scoped>
</style>
