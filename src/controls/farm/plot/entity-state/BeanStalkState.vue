<template>
    <div>
        <plant-details :plant=entity></plant-details>
        <div class="flex">
            <div class="col align-self-center"></div>
        </div>
    </div>
</template>

<script>
import PlantDetails from "@/controls/farm/plot/plant-details.vue";
import BeanStalkState from "@/scripts/plant/species/BeanStalkState";

export default {
    name: "BeanStalkState",
    components: {
        PlantDetails,
    },
    props: {
        entity: {
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
