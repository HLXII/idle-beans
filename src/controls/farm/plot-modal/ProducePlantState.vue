<template>
    <div>
        <plant-details :plant=plant></plant-details>
        <div class="flex">
            <div class="col align-self-center">{{plant.produceText}}</div>
        </div>
        <igt-progress-bar :percentage="plant.producePercent" ></igt-progress-bar>
    </div>
</template>

<script>
import PlantDetails from "@/controls/farm/plot-modal/plant-details";
import IgtProgressBar from '@/components/util/igt-progress-bar.vue';
import ProducePlantState from "@/scripts/plant/ProducePlantState";

export default {
    name: "ProducePlantState",
    components: {
        PlantDetails,
        IgtProgressBar,
    },
    props: {
        plant: {
            type: ProducePlantState,
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
