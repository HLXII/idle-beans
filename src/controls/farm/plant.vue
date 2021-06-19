<template>
    <div class="plant" style="position: absolute; pointer-events: none;"
        v-bind:style="style">
        <div v-show="!displayIcons" class="plantContainer">
            <plant-statuses v-if="displayStatus" :statuses="plant.statuses"></plant-statuses>
            <svg class="plantImage" xmlns="http://www.w3.org/2000/svg" :viewBox="image.viewBox" shape-rendering="crispEdges" v-on:click="controller.clickPlant(plant.row, plant.col)">
                <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
                <path v-for="path in image.paths" v-bind:key="path.stroke" pointer-events="painted" :stroke="path.stroke" :d="path.d" />
            </svg>
        </div>
        <div v-show="displayIcons" class="plantContainer">
            <plant-statuses v-if="displayStatus" :statuses="plant.statuses"></plant-statuses>
            <img class="plantImage" :src="plant.data.icon"
                style="width: 100%; pointer-events: auto;"
                v-on:click="controller.clickPlant(plant.row, plant.col)"/>
        </div>
    </div>
</template>

<script>
import AbstractFarm from "@/scripts/farm/AbstractFarm";
import GameController from "@/scripts/GameController";
import PlantState from "@/scripts/plant/PlantState";

import PlantStatuses from "@/controls/farm/plant-statuses";

import { PlantImages } from "@/scripts/plant/PlantImages";

export default {
    name: "plant",
    components: {
        PlantStatuses,
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
        plant: {
            type: PlantState,
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
        width() {
            return `${100 / this.farms.plots.length}%`;
        },
        style() {
            return {
                bottom: '0%',
                'padding-bottom': `${((this.farm.plots.length - this.plant.row - 1) * 100 / this.farm.plots.length)}%`,
                left: `${this.plant.col * 100 / this.farm.plots.length}%`,
                width: `${100 / this.farm.plots.length}%`,
            };
        },
        image() {
            return this.PlantImages[this.plant.image];
        }
    }
}
</script>

<style>
    .plot:hover {
        filter: brightness(.5);
    }
    .plantContainer {
        position: relative;
    }
    .plantImage:hover {
        filter: brightness(.5);
    }
</style>
