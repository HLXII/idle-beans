<template>
    <div>
        <plant-details :plant="entity"></plant-details>
    </div>
</template>

<script>
import PlantDetails from "@/controls/farm/plot/plant-details.vue";
import EntityState from "@/scripts/entity/EntityState";

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
