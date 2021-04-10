<template>
    <modal v-if=plot :show="show" @close="close">
        <div class="modal-content" data-bind="if: plot()">
            <div class="modal-header">
                <h5>Plot</h5>
                <button type="button" class="btn-close" aria-label="Close" @click=close></button>
            </div>
            <div class="modal-body p-0">
                <!-- Plant Data -->
                <component v-if=plant v-bind:is=plant.template :plant=plant :controller=controller ></component>
                <!-- Dirt Data -->
                <!-- TODO -->
                <div>

                </div>
            </div>
            <div class="modal-footer">

            </div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal";
import {App} from "@/App.ts"
import PlantState from "@/controls/farm/plot-modal/PlantState";
import GrowthPlantState from "@/controls/farm/plot-modal/GrowthPlantState";

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
        plant() {
            return this.plot.plant;
        }
    },
}
</script>

<style scoped>

</style>
