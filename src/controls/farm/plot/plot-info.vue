<template>
    <div v-show=plot>
        <!-- Entity Data -->
        <component v-if=entity v-bind:is=entity.modalTemplate :entity="entity" :controller="controller" ></component>
        <!-- Dirt Data -->
        <plot-details :plot="plot"></plot-details>
    </div>
</template>

<script>
import PlantState from "@/controls/farm/plot/entity-state/PlantState.vue";
import ProducePlantState from "@/controls/farm/plot/entity-state/ProducePlantState.vue";
import BeanStalkState from "@/controls/farm/plot/entity-state/BeanStalkState.vue";
import PlotDetails from './plot-details.vue';
import Plot from '@/scripts/farm/Plot';
import GameController from '@/scripts/GameController';

export default {
    name: "plot-info",
    components: {
        PlantState,
        ProducePlantState,
        BeanStalkState,
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
