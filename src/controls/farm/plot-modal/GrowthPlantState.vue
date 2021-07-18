<template>
    <div>
        <plant-details :plant=entity></plant-details>
    </div>
</template>

<script>
import PlantDetails from "@/controls/farm/plot-modal/plant-details.vue";
import GrowthPlantState from "@/scripts/plant/GrowthPlantState";

export default {
    name: "GrowthPlantState",
    components: {
        PlantDetails,
    },
    props: {
        entity: {
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
