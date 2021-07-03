<template>
    <div>
        <plant-details :plant=plant></plant-details>
        <status-table>
            <status label="Ripe Beans:" :percent="plant.storagePercent" :text="plant.storageText"/>
            <status :label="plant.produceText" :percent="plant.producePercent"/>
        </status-table>
        <!--
        <td style="width:1%;padding-right:10px;"><game-button style="height: 24px;" text="Harvest" :onClick="harvest" /></td>
        -->
    </div>
</template>

<script>
import PlantDetails from "@/controls/farm/plot-modal/plant-details.vue";
import ProducePlantState from "@/scripts/plant/ProducePlantState";
import StatusTable from '@/controls/farm/plot-modal/status-table.vue'
import Status from '@/controls/farm/plot-modal/status.vue'

export default {
    name: "ProducePlantState",
    components: {
        PlantDetails,
        StatusTable,
        Status,
    },
    props: {
        plant: {
            type: ProducePlantState,
            required: true,
        }
    },
    methods: {
        harvest() {
            this.plant.harvest();
        },
    },
    computed: {

    },
}
</script>

<style scoped>

</style>
