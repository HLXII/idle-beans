<template>
    <div>
        <plant-details :plant=plant></plant-details>
        <status-table>
            <status label="Growth:" :percent="plant.growthPercent" :text="plant.growthText"/>
        </status-table>
    </div>
</template>

<script>
import PlantDetails from "@/controls/farm/plot-modal/plant-details.vue";
import GrowthPlantState from "@/scripts/plant/GrowthPlantState";
import StatusTable from '@/controls/farm/plot-modal/status-table.vue'
import Status from '@/controls/farm/plot-modal/status.vue'

export default {
    name: "GrowthPlantState",
    components: {
        PlantDetails,
        StatusTable,
        Status,
    },
    props: {
        plant: {
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
