<template>
    <div>
        <plant-details :plant=plant></plant-details>

        <div class="flex">
            <div data-bind="template: { name: 'icon', data: plants.list[plant.growthPlant()].icon }"></div>
            <div class="col align-self-center" data-bind="text: 'Growing into ' + plant.growthPlant()">Growing into {{plant.growthPlant}}</div>
        </div>
        <igt-progress-bar :percentage="plant.growthPercent" ></igt-progress-bar>

        <div class="flex">
            <div class="flex-fill">
                <span data-bind="html: plant.harvestGainMessage()"></span>
            </div>
            <button type="button" class="btn btn-danger float-end" data-bind="click: function() { farm.removePlant(plot()); }">Harvest</button>
        </div>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import PlantDetails from "@/controls/farm/plot-modal/plant-details";
import IgtProgressBar from '@/components/util/igt-progress-bar.vue';
import GrowthPlantState from "@/scripts/plant/GrowthPlantState";

export default {
    name: "GrowthPlantState",
    components: {
        PlantDetails,
        IgtProgressBar,
    },
    props: {
        plant: {
            type: GrowthPlantState,
            required: true,
        }
    },
    methods: {

    },
    computed: {

    },
}
</script>

<style scoped>

</style>
