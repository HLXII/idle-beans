<template>
    <div class="m-2 sm:m-4 md:m-6 lg:m-8" style="position: relative;">
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
    
        <!-- Entity Layer -->
        <div class="entities">
            <entity v-for="entity in entities" :key="entity.id" :entity=entity 
                :farm=farm :controller=controller
                :displayIcons="displayIcons"
                :displayStatus="displayStatus"></entity>
        </div>
        
        <slot></slot>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import Entity from "@/controls/farm/entity.vue";

export default {
    name: "farm",
    components: {
        Entity,
    },
    data() {
        return {
            farms: App.game.features.farms,
            controller: App.game.features.controller,
            settings: App.game.features.settings,
        }
    },
    computed: {
        farm() {
            return this.farms.getFarm();
        },
        width() {
            return `${100 / this.farm.plots.length}%`;
        },
        entities() {
            return this.farm.entities.filter(entity => entity);
        },
        plots() {
            return this.farm.plots;
        },
        displayIcons() {
            return this.settings.getSetting('displayPlantIcons').value;
        },
        displayStatus() {
            return this.settings.getSetting('displayPlantStatus').value;
        },
    }
}
</script>

<style scoped>
    .plot:hover {
        filter: brightness(.5);
    }
</style>
