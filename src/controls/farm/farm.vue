<template>
    <div class="m-12" style="position: relative;">
        <!-- Dirt Layer -->
        <div class="farm">
            <div class="farm-row flex" v-for="(row, yIdx) in plots" :key="yIdx">
                <div class="plot" div v-for="(plot, xIdx) in row" :key="xIdx"
                    v-bind:style="{width: width}"
                    v-on:click="controller.clickDirt(yIdx, xIdx)">
                    <img :src="require(`@/assets/images/Dirt.png`)" width="100%"/>
                </div>
            </div>
        </div>
    
        <!-- Plant Layer -->
        <div class="plants">
            <plant v-for="plant in plants" :key="plant.id" :plant=plant 
                :farm=farm :controller=controller
                :displayIcons="displayIcons"
                :displayStatus="displayStatus"></plant>
        </div>
        
        <slot></slot>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import Plant from "@/controls/farm/plant";
import {SettingId} from "@/ig-template/features/settings/SettingId";

export default {
    name: "farm",
    components: {
        Plant,
    },
    data() {
        return {
        farms: App.game.features.farms,
        controller: App.game.features.controller,
        farm: App.game.features.farms.farms[App.game.features.farms.activeFarm],
        settings: App.game.features.settings,
        SettingId,
        }
    },
    computed: {
        width() {
            return `${100 / this.farm.plots.length}%`;
        },
        plants() {
            return this.farm.plants.filter(plant => plant);
        },
        plots() {
            return this.farm.plots;
        },
        displayIcons() {
            return this.settings.getSetting(SettingId.DisplayPlantIcons).value;
        },
        displayStatus() {
            return this.settings.getSetting(SettingId.DisplayPlantStatus).value;
        },
    }
}
</script>

<style scoped>
    .plot:hover {
        filter: brightness(.5);
    }
</style>
