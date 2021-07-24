<template>
    <div class="entity" style="position: absolute; pointer-events: none;"
        v-bind:style="style">
        <div class="entityContainer">
            <plot-statuses v-if="displayStatus" :statuses="statuses"></plot-statuses>
            <svg v-if="exists" class="entityImage" xmlns="http://www.w3.org/2000/svg" :viewBox="svgData.viewBox" shape-rendering="crispEdges" v-on:click="controller.clickEntity(entity.row, entity.col)">
                <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
                <path v-for="path in svgData.paths" v-bind:key="path.stroke" pointer-events="painted" :stroke="path.stroke" :d="path.d" />
            </svg>
        </div>
    </div>
</template>

<script>
import AbstractFarm from "@/scripts/farm/AbstractFarm";
import GameController from "@/scripts/GameController";
import EntityState from "@/scripts/entity/EntityState";

import PlotStatuses from "@/controls/farm/plot-statuses.vue";

import { PlantImages } from "@/scripts/plant/PlantImages";
import EmptyEntityState from '@/scripts/entity/EmptyEntityState';

export default {
    name: "entity",
    components: {
        PlotStatuses,
    },
    data() {
        return {
            PlantImages,
        }
    },
    props: {
        farm: {
            type: AbstractFarm,
            required: true,
        },
        controller: {
            type: GameController,
            required: true,
        },
        entity: {
            type: EntityState,
        },
        displayIcons: {
            type: Boolean,
            required: true,
        },
        displayStatus: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        exists() {
            return !(this.entity instanceof EmptyEntityState);
        },
        width() {
            return `${100 / this.farms.plots.length}%`;
        },
        style() {
            return {
                bottom: '0%',
                'padding-bottom': `${((this.farm.plots.length - this.entity.row - 1) * 100 / this.farm.plots.length)}%`,
                left: `${this.entity.col * 100 / this.farm.plots.length}%`,
                width: `${100 / this.farm.plots.length}%`,
            };
        },
        svgData() {
            return this.displayIcons ? this.entity.icon : this.entity.image;
        },
        statuses() {
            return this.entity.statuses.concat(this.entity.plot.statuses);
        },
    }
}
</script>

<style>
    .plot:hover {
        filter: brightness(.5);
    }
    .entityContainer {
        position: relative;
    }
    .entityImage:hover {
        filter: brightness(.5);
    }
</style>
