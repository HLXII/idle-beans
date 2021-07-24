<template>
    <div>
        <plant-details :plant="entity"></plant-details>
    </div>
</template>

<script>
import PlantDetails from "@/controls/farm/plot-modal/plant-details.vue";
import EntityState from "@/scripts/entity/EntityState";

export default {
    name: "LegumaPlantState",
    data() {
        return {

        }
    },
    components: {
        PlantDetails,
    },
    props: {
        entity: {
            type: EntityState,
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
