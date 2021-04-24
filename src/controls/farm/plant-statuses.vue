<template>
    <div class="plantStatuses">
        <div  v-for="(status, idx) in statuses" :key="idx">
            <progress-bar :percentage="status.percent" :tooltip="status.tooltip"></progress-bar>
        </div>
    </div>
</template>

<script>
import ProgressBar from "@/controls/progress-bar";

export default {
    name: "plant-statuses",
    components: {
        ProgressBar,
    },
    props: {
        statuses: {
            type: Array,
            required: true,
        },
    },
    computed: {

    },
}
</script>

<style scoped>
.plantStatuses {
    position: absolute;
    width:100%;
    bottom: 0;
    pointer-events: auto;
}
</style>
