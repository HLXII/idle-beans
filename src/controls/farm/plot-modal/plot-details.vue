<template>
    <div>
        <status-table>
            <status v-for="status in plot.statuses" :key="status.label" :status="status" />
        </status-table>
    </div>
</template>

<script>
import {App} from "@/App.ts";
import Plot from '@/scripts/farm/Plot';
import StatusTable from './status-table.vue';
import Status from './status.vue';

export default {
    name: "plot-details",
    data() {
        return {
            farms: App.game.features.farms,
            controller: App.game.features.controller,
        }; 
    },
    components: {
        StatusTable,
        Status,
    },
    props: {
        plot: {
            type: Plot,
            required: true,
        }
    },
    computed: {
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
