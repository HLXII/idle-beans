<template>
    <modal v-show=plot :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
                <h5>Plot</h5>
                <button type="button" class="btn-close" aria-label="Close" @click=close></button>
            </div>
            <plot-info class="modal-body p-0" :controller="controller" :plot="plot" />
            <div class="modal-footer"></div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal.vue";
import {App} from "@/App.ts"
import PlotInfo from './plot-info.vue';

export default {
    name: "plot-modal",
    data() {
        return {
            controller: App.game.features.controller,
            farms: App.game.features.farms,
        }
    },
    components: {
        Modal,
        PlotInfo,
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
            return this.farms.getFarm().getPlot(this.controller.plot.row, this.controller.plot.col);
        },
    },
}
</script>

<style scoped>

</style>
