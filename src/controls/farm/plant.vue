<template>
    <div class="plant" style="position: absolute; pointer-events: none;"
        v-bind:style="style">
        <component v-if="!displayIcons" v-bind:is=image :row=plant.row :col=plant.col :controller=controller>
            <plant-statuses v-if="displayStatus" :statuses="plant.statuses"></plant-statuses>
        </component>
        <div v-if="displayIcons" class="plantContainer">
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

import BeanBud from "@/controls/plant/BeanBud";
import BeanPlant from "@/controls/plant/BeanPlant";
import BeanSprout from "@/controls/plant/BeanSprout";
import BeanStalk from "@/controls/plant/BeanStalk";
import BeanVine from "@/controls/plant/BeanVine";
import GreenBeanPlant from "@/controls/plant/GreenBeanPlant";
import YellowBeanPlant from "@/controls/plant/YellowBeanPlant";
import YellowBeanSprout from "@/controls/plant/YellowBeanSprout";

export default {
    name: "plant",
    components: {
        PlantStatuses,
        BeanBud,
        BeanPlant,
        BeanSprout,
        BeanStalk,
        BeanVine,
        GreenBeanPlant,
        YellowBeanPlant,
        YellowBeanSprout,
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
            return this.plant.image;
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
