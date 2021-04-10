<template>
    <div class="plant" style="position: absolute; pointer-events: none;"
        v-bind:style="style">
        <component v-if="!displayIcons" v-bind:is=image :row=plant.row :col=plant.col :controller=controller ></component>
        <img v-if="displayIcons" :src="plant.data.icon"
            class="plantImage" style="width: 100%; pointer-events: auto;"
            v-on:click="controller.clickPlant(plant.row, plant.col)"/>
    </div>
</template>

<script>
import AbstractFarm from "@/scripts/farm/AbstractFarm";
import GameController from "@/scripts/GameController";
import PlantState from "@/scripts/plant/PlantState";

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

<style scoped>
    .plot:hover {
        filter: brightness(.5);
    }
    .plantImage:hover {
        filter: brightness(.5);
    }
</style>
