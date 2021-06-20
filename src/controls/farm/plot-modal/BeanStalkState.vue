<template>
    <div>
        <plant-details :plant=plant></plant-details>
        <div class="flex">
            <div class="col align-self-center">TEST</div>
        </div>
    </div>
</template>

<script>
import PlantDetails from "@/controls/farm/plot-modal/plant-details";
import BeanStalkState from "@/scripts/plant/species/BeanStalkState";

export default {
    name: "BeanStalkState",
    components: {
        PlantDetails,
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
