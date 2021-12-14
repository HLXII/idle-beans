<template>
    <div style="position: relative;height:100%">
        <!-- Dirt Layer -->
        <div class="farm">
            <div class="farm-row flex" v-for="(row, yIdx) in plots" :key="yIdx">
                <div class="plot" div v-for="(plot, xIdx) in row" :key="xIdx"
                    v-bind:style="{width: width}"
                    v-bind:class="{'selected': isSelectedPlot(yIdx, xIdx)}"
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
    </div>
</template>

<script>
import {App} from "@/App.ts"
import Entity from "@/controls/farm/entity.vue";
import { InfoType, TabType } from '@/scripts/GameController';

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
        selectedPlot() {
            return this.controller.plot;
        }
    },
    methods: {
        isSelectedPlot(row, col) {
            if (this.settings.getSetting('useModal').value || this.controller.tabs[TabType.Info] !== InfoType.Plot) {
                return false;
            } else {
                return this.controller.plot.row == row && this.controller.plot.col == col;
            }
        },
    },
}
</script>

<style scoped>
    .plot:hover {
        filter: brightness(.75);
    }

    .plot.selected {
        filter: brightness(.5);
    }

</style>
