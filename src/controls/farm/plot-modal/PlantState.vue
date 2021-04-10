<template>
    <div>
        <plant-details :plant=plant></plant-details>
    </div>
</template>

<script>
import PlantDetails from "@/controls/farm/plot-modal/plant-details";
import PlantState from "@/scripts/plant/PlantState";

export default {
    name: "PlantState",
    data() {
        return {

        }
    },
    components: {
        PlantDetails,
    },
    props: {
        plant: {
            type: PlantState,
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
