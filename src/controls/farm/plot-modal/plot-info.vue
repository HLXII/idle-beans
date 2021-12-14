<template>
    <div v-show=plot>
        <!-- Entity Data -->
        <component v-if=entity v-bind:is=entity.modalTemplate :entity="entity" :controller="controller" ></component>
        <!-- Dirt Data -->
        <plot-details :plot="plot"></plot-details>
    </div>
</template>

<script>
import EmptyEntityState from "@/controls/farm/plot-modal/EmptyEntityState.vue";
import PlantState from "@/controls/farm/plot-modal/PlantState.vue";
import GrowthPlantState from "@/controls/farm/plot-modal/GrowthPlantState.vue";
import ProducePlantState from "@/controls/farm/plot-modal/ProducePlantState.vue";
import BeanStalkState from "@/controls/farm/plot-modal/BeanStalkState.vue";
import LegumaPlantState from "@/controls/farm/plot-modal/LegumaPlantState.vue";
import PlotDetails from './plot-details.vue';
import Plot from '@/scripts/farm/Plot';
import GameController from '@/scripts/GameController';

export default {
    name: "plot-info",
    components: {
        EmptyEntityState,
        PlantState,
        GrowthPlantState,
        ProducePlantState,
        BeanStalkState,
        LegumaPlantState,
        PlotDetails,
    },
    props: {
        controller: {
            type: GameController,
            required: true,
        },
        plot: {
            type: Plot,
            required: true,
        },
    },
    methods: {

    },
    computed: {
        entity() {
            return this.plot.entity;
        }
    },
}
</script>

<style scoped>

</style>
