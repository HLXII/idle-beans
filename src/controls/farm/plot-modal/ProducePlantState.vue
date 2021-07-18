<template>
    <div>
        <plant-details :plant=entity></plant-details>
        <status-table>
            <status label="Ripe Beans:" :percent="entity.storagePercent" :text="entity.storageText"/>
            <status :label="entity.produceText" :percent="entity.producePercent"/>
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
