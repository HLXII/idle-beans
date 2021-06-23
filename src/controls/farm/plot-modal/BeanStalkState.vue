<template>
    <div>
        <plant-details :plant=plant></plant-details>
        <div class="flex">
            <div class="col align-self-center">Consume Cooldown</div>
        </div>
        <igt-progress-bar :percentage="plant.consumptionPercent" ></igt-progress-bar>
        <div class="flex">
            <div class="col align-self-center">Height</div>
        </div>
        <igt-progress-bar :percentage="plant.consumptionPercent" ></igt-progress-bar>
        <div>{{plant.consumed}}</div>
    </div>
</template>

<script>
import PlantDetails from "@/controls/farm/plot-modal/plant-details";
import BeanStalkState from "@/scripts/plant/species/BeanStalkState";
import IgtProgressBar from '@/components/util/igt-progress-bar.vue';

export default {
    name: "BeanStalkState",
    components: {
        PlantDetails,
        IgtProgressBar,
    },
    props: {
        plant: {
            type: BeanStalkState,
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
