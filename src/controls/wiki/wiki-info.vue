<template>
    <div class="flex-1">
        <!-- Bean Tab -->
        <nav-tab :tabType="0" :activeTab="wikiTab">
            <nav class="flex gap-1 mb-1" v-if="beanCats.length > 1">
                <nav-button v-for="cat in beanCats" :key="cat" :class="{notification: notifications.hasBeanCatNotification(cat)}" :tabName="BeanCategory[cat]" :tabType="cat" :changeTab="changeBeanTab" :activeTab="beanTab"/>
            </nav>
            <div class="grid grid-cols-3 gap-2" style="height: 640px;">
                <div class="border2 bg-generic">
                    <wiki-entry v-for="bean in beanList" :key="bean.name" :class="{notification: notifications.hasBeanNotification(bean.name)}" :id="bean.elementName" :entry="bean" :controller=controller :activeEntry="beanEntry" :change="changeBean"></wiki-entry>
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
                <nav-button v-for="cat in plantCats" :key="cat" :class="{notification: notifications.hasPlantCatNotification(cat)}" :tabName="PlantCategory[cat]" :tabType="cat" :changeTab="changePlantTab" :activeTab="plantTab"/>
            </nav>
            <div class="grid grid-cols-3 gap-2" style="height: 640px;">
                <div class="border2 bg-generic">
                    <wiki-entry v-for="plant in plantList" :key="plant.name" :class="{notification: notifications.hasPlantNotification(plant.name)}" :id="plant.elementName" :entry="plant" :controller=controller :activeEntry="plantEntry" :change="changePlant"></wiki-entry>
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
                        <game-text :text="plant.description" :wiki="wiki"/>
                    </div>
                    <div>
                        <nav class="flex gap-1 mb-1">
                            <nav-button class="flex-1" v-if="visibleGrowths.length > 0" tabName="Growths" :tabType=0 :changeTab="changePlantDetailsTab" :activeTab="plantDetailsTab"/>
                            <nav-button class="flex-1" v-if="purchasedUpgrades.length > 0" tabName="Upgrades" :tabType=1 :changeTab="changePlantDetailsTab" :activeTab="plantDetailsTab"/>
                        </nav>
                    </div>
                    <nav-tab class="flex flex-col gap-1" :tabType="0" :activeTab="plantDetailsTab">
                        <wiki-growth v-for="growth in visibleGrowths" :key="`growth_${growth.plant}`" :growth="growth" :plants="plants" :wiki="wiki"/>
                    </nav-tab>
                    <nav-tab class="flex flex-col gap-1" :tabType="1" :activeTab="plantDetailsTab">
                        <plant-upgrade v-for="upgrade in purchasedUpgrades" :key="upgrade.id" :plant="plant" :upgrade="upgrade" :displayOnly="true" 
                            :controller="controller" :plants="plants" :beans="beans" :wiki="wiki"/>
                    </nav-tab>
                </div>
            </div>
        </nav-tab>
        <!-- Farm Tab -->
        <nav-tab :tabType="2" :activeTab="wikiTab">
            <nav class="flex gap-1 mb-1" v-if="plantCats.length > 1">
                <nav-button v-for="cat in farmCats" :key="cat" :class="{notification: notifications.hasFarmCatNotification(cat)}" :tabName="PlantCategory[cat]" :tabType="cat" :changeTab="changeFarmTab" :activeTab="farmTab"/>
            </nav>
            <div class="grid grid-cols-3 gap-2" style="height: 640px;">
                <div class="border2 bg-generic">
                    <wiki-entry v-for="entry in farmList" :key="entry.name" :class="{notification: notifications.hasEntryNotification(entry.name)}" :id="entry.elementName" :entry="entry" :controller=controller :activeEntry="farmEntry" :change="changeFarm"></wiki-entry>
                </div>
                <div class="border2 bg-generic col-span-2 p-1">

                </div>
            </div>
        </nav-tab>
    </div>
</template>

<script>
import { App } from "@/App.ts"
import NavButton from "@/controls/utility/nav-button.vue";
import NavTab from '@/controls/utility/nav-tab.vue';
import WikiGrowth from './wiki-growth.vue';

import { BeanCategory } from "@/scripts/bean/BeanList";
import { PlantCategory } from "@/scripts/plant/PlantList";
import GameText from '@/controls/utility/game-text.vue';
import GameController, { TabType } from "@/scripts/GameController";
import PlantUpgrade from '../prestige-view/plant-upgrade.vue';
import WikiEntry from './wiki-entry.vue';
import GameHelper from '@/scripts/GameHelper';
import { FarmType } from '@/scripts/farm/FarmType';
import { WikiType } from '@/scripts/wiki/WikiType';
import Beans from '@/scripts/bean/Beans';
import Plants from '@/scripts/plant/Plants';
import Farms from '@/scripts/farm/Farms';
import Wiki from '@/scripts/wiki/Wiki';
import Notifications from '@/scripts/notifications/Notifications';

export default {
    name: "wiki-info",
    data() {
        return {
            BeanCategory,
            PlantCategory,
        }
    },
    components: {
        NavButton,
        NavTab,
        WikiGrowth,
        GameText,
        PlantUpgrade,
        WikiEntry,
    },
    props: {
        controller: {
            type: GameController,
            required: true,
        },
        beans: {
            type: Beans,
            required: true,
        },
        plants: {
            type: Plants,
            required: true,
        },
        farms: {
            type: Farms,
            required: true,
        },
        wiki: {
            type: Wiki,
            required: true,
        },
        notifications: {
            type: Notifications,
            required: true,
        },
    },
    methods: {
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
        changeFarmTab: function(tab) {
            this.controller.changeTab(TabType.WikiFarm, tab);
        },

        changeBean: function(beanType) {
            this.wiki.changeEntry(WikiType.Bean, beanType);
        },
        changePlant: function(plantType) {
            this.wiki.changeEntry(WikiType.Plant, plantType);
        },
        changeFarm: function(farmType) {
            this.wiki.changeEntry(WikiType.Farm, farmType);
        },
    },
    computed: {
        wikiTab() {
            return this.controller.tabs[TabType.Wiki];
        },

        //#region Beans
        beanList() {
            return this.wiki.beanList;
        },
        beanEntry() {
            return this.wiki.selectedEntry[WikiType.Bean];
        },
        bean() {
            return this.beans.list[this.beanEntry];
        },
        beanCats() {
            return Object.values(this.BeanCategory).filter((val) => {
                if (isNaN(val)) {
                    return false;
                }
                return this.beans.filter((bean) => {
                    if (bean.category !== val) {
                        return false;
                    }
                    return bean.unlocked;
                }).length > 0;
            });
        },
        beanTab() {
            return this.controller.tabs[TabType.WikiBean];
        },
        //#endregion

        //#region Plants
        plantList() {
            return this.wiki.plantList;
        },
        plantEntry() {
            return this.wiki.selectedEntry[WikiType.Plant];
        },
        plant() {
            return this.plants.list[this.plantEntry];
        },
        plantCats() {
            return Object.values(this.PlantCategory).filter((val) => {
                if (isNaN(val)) {
                    return false;
                }
                return this.plants.filter((plant) => {
                    if (plant.category !== val) {
                        return false;
                    }
                    return plant.unlocked;
                }).length > 0;
            });        
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
        //#endregion

        //#region Farms
        farmList() {
            return this.wiki.farmEntries;
        },
        farmEntry() {
            return this.wiki.selectedEntry[WikiType.Farm];
        },
        farm() {
            return this.farms.farms[this.farmEntry];
        },
        farmCats() {
            return GameHelper.enumNumbers(FarmType).filter((num) => this.farms.farms[num].unlocked);
        },
        farmTab() {
            return this.controller.tabs[TabType.WikiFarm];
        },
        //#endregion
    },
}
</script>

<style scoped>

.notification {
    font-weight: bold;
}

</style>
