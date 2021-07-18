<template>
    <div>
        <plant-details :plant=entity></plant-details>
        <game-button bg="bg-green-500" text="Harvest" :enabled="entity.hasBeans" :onClick="harvest" />
    </div>
</template>

<script>
import PlantDetails from "@/controls/farm/plot-modal/plant-details.vue";
import ProducePlantState from "@/scripts/plant/ProducePlantState";
import GameButton from '@/controls/utility/game-button.vue';

export default {
    name: "ProducePlantState",
    components: {
        PlantDetails,
        GameButton,
    },
    props: {
        entity: {
            type: ProducePlantState,
            required: true,
        }
    },
    methods: {
        harvest() {
            this.entity.harvest();
        },
    },
    computed: {

    },
}
</script>

<style scoped>

</style>
