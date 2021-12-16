<template>
    <div class="flex flex-col gap-1 flex-grow">
        <nav class="flex gap-1">
            <nav-button class="flex-1" tabName="Plot"           :tabType="InfoType.Plot"            :activeTab="infoTab" :changeTab="changeTab" v-if="!prestigeMode"/>
            <nav-button class="flex-1" tabName="Prestige"       :tabType="InfoType.PrestigeShop"    :activeTab="infoTab" :changeTab="changeTab" v-if="prestigeMode"/>
            <nav-button class="flex-1" tabName="Wiki"           :tabType="InfoType.Wiki"            :activeTab="infoTab" :changeTab="changeTab"/>
            <nav-button class="flex-1" tabName="Prestige"       :tabType="InfoType.Prestige"        :activeTab="infoTab" :changeTab="changeTab" v-if="!prestigeMode"/>
            <nav-button class="flex-1" tabName="Achievements"   :tabType="InfoType.Achievements"    :activeTab="infoTab" :changeTab="changeTab"/>
            <nav-button class="flex-1" tabName="Settings"       :tabType="InfoType.Settings"        :activeTab="infoTab" :changeTab="changeTab"/>
        </nav>
        <div class="border2 flex-1">
            <!-- Selected Plot Tab -->
            <nav-tab :tabType="InfoType.Plot" :activeTab="infoTab">
                <plot-info :controller="controller" :plot="plot"/>
            </nav-tab>
            <!-- Wiki Tab -->
            <nav-tab :tabType="InfoType.Wiki" :activeTab="infoTab">
                <wiki-nav :notifications="notifications" :controller="controller" />
                <wiki-info 
                    :controller="controller" 
                    :notifications="notifications" 
                    :plants="plants" 
                    :farms="farms" 
                    :beans="beans" 
                    :wiki="wiki" />
            </nav-tab>
            <!-- Prestige Tab -->
            <nav-tab :tabType="InfoType.Prestige" :activeTab="infoTab">
                <prestige-nav :controller="controller" />
                <prestige-info :controller="controller" :prestige="prestige" :wiki="wiki" />
            </nav-tab>
            <!-- Achievements Tab -->
            <nav-tab :tabType="InfoType.Achievements" :activeTab="infoTab">
                <!-- TODO -->
            </nav-tab>
            <!-- Settings Tab -->
            <nav-tab :tabType="InfoType.Settings" :activeTab="infoTab">
                <settings-nav :controller="controller" />
                <settings-info :controller="controller" :settings="settings" />
            </nav-tab>
            <!-- Prestige Shop Tab -->
            <nav-tab :tabType="InfoType.PrestigeShop" :activeTab="infoTab">
                <prestige-shop :controller="controller" :prestige="prestige" :wiki="wiki" :beans="beans" :upgrades="upgrades" />
            </nav-tab>
        </div>
    </div>
</template>

<script>
import GameController, { TabType } from '@/scripts/GameController'
import NavButton from './utility/nav-button.vue'
import NavTab from './utility/nav-tab.vue'
import PlotInfo from './farm/plot/plot-info.vue'
import WikiInfo from './wiki/wiki-info.vue'
import Farms from '@/scripts/farm/Farms'
import WikiNav from './wiki/wiki-nav.vue'
import PrestigeNav from './prestige/prestige-nav.vue'
import PrestigeInfo from './prestige/prestige-info.vue'
import PrestigeHandler from '@/scripts/prestige/PrestigeHandler'
import Wiki from '@/scripts/wiki/Wiki'
import Plants from '@/scripts/plant/Plants'
import Beans from '@/scripts/bean/Beans'
import { Settings } from '@/scripts/Settings'
import Notifications from '@/scripts/notifications/Notifications'
import SettingsNav from './settings/settings-nav.vue'
import SettingsInfo from './settings/settings-info.vue'
import { InfoType } from '@/scripts/GameController'
import Upgrades from '@/scripts/upgrade/Upgrades'
import PrestigeShop from './prestige-view/prestige-shop.vue'

export default {
    name: 'info-view',
    data() {
        return {
            InfoType,
        };
    },
    components: {
        NavButton,
        NavTab,
        PlotInfo,
        WikiInfo,
        WikiNav,
        PrestigeNav,
        PrestigeInfo,
        SettingsNav,
        SettingsInfo,
        PrestigeShop,
    },
    props: {
        controller: {
            type: GameController,
            required: true,
        },
        farms: {
            type: Farms,
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
        plants: {
            type: Plants,
            required: true,
        },
        beans: {
            type: Beans,
            required: true,
        },
        settings: {
            type: Settings,
            required: true,
        },
        notifications: {
            type: Notifications,
            required: true,
        },
        upgrades: {
            type: Upgrades,
            required: true,
        },
    },
    computed: {
        infoTab() {
            return this.controller.tabs[TabType.Info];
        },
        plot() {
            return this.farms.getFarm().getPlot(this.controller.plot.row, this.controller.plot.col);
        },
        prestigeMode() {
            return this.prestige.prestiged;
        },
    },
    methods: {
        changeTab(tab) {
            return this.controller.changeTab(TabType.Info, tab);
        }
    },
}
</script>

<style>

</style>
