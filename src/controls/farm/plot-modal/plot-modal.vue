<template>
    <modal v-show=plot :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
                <h5>Plot</h5>
                <button type="button" class="btn-close" aria-label="Close" @click=close></button>
            </div>
            <div class="modal-body p-0">
                <!-- Entity Data -->
                <component v-if=entity v-bind:is=entity.modalTemplate :entity="entity" :controller="controller" ></component>
                <!-- Dirt Data -->
                <plot-details :plot="plot"></plot-details>
            </div>
            <div class="modal-footer">

            </div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal.vue";
import {App} from "@/App.ts"
import PlantState from "@/controls/farm/plot-modal/PlantState.vue";
import GrowthPlantState from "@/controls/farm/plot-modal/GrowthPlantState.vue";
import ProducePlantState from "@/controls/farm/plot-modal/ProducePlantState.vue";
import BeanStalkState from "@/controls/farm/plot-modal/BeanStalkState.vue";
import LegumaPlantState from "@/controls/farm/plot-modal/LegumaPlantState.vue";
import PlotDetails from './plot-details.vue';

export default {
    name: "plot-modal",
    data() {
        return {
            plants: App.game.features.plants,
            beans: App.game.features.beans,
            controller: App.game.features.controller,
            farm: App.game.features.farms,
        }
    },
    components: {
        Modal,
        PlantState,
        GrowthPlantState,
        ProducePlantState,
        BeanStalkState,
        LegumaPlantState,
        PlotDetails,
    },
    props: {
        show: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        close: function() {
            this.$emit('close');
        }
    },
    computed: {
        plot() {
            return this.farm.getFarm().getPlot(this.controller.plot.row, this.controller.plot.col);
        },
        entity() {
            return this.plot.entity;
        }
    },
}
</script>

<style scoped>

</style>
