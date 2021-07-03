<template>
    <div>
        <plant-details :plant=plant></plant-details>
        <div class="flex">
            <div class="col align-self-center"></div>
        </div>
        <status-table>
            <status label="Consume Cooldown:" :percent="plant.consumptionPercent"/>
            <status :label="plant.heightLabel" :percent="plant.heightPercent" :text="plant.heightText"/>
        </status-table>
    </div>
</template>

<script>
import PlantDetails from "@/controls/farm/plot-modal/plant-details";
import BeanStalkState from "@/scripts/plant/species/BeanStalkState";
import StatusTable from '@/controls/farm/plot-modal/status-table.vue'
import Status from '@/controls/farm/plot-modal/status.vue'

export default {
    name: "BeanStalkState",
    components: {
        PlantDetails,
        StatusTable,
        Status,
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
