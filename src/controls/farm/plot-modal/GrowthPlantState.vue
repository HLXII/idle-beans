<template>
    <div>
        <plant-details :plant=plant></plant-details>
        <div class="flex">
            <div data-bind="template: { name: 'icon', data: plants.list[plant.growthPlant()].icon }"></div>
            <div class="col align-self-center" data-bind="text: 'Growing into ' + plant.growthPlant()">Growing into {{plant.growthPlant}}</div>
        </div>
        <igt-progress-bar :percentage="plant.growthPercent" ></igt-progress-bar>
    </div>
</template>

<script>
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
