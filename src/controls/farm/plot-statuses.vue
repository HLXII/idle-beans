<template>
    <div class="plotStatuses">
        <div  v-for="(status, idx) in statuses" :key="idx">
            <progress-bar :fgClass="`bg-${status.color}-500`" :bgClass="`bg-${status.color}-200`" :percentage="status.percent" :tooltip="status.text"></progress-bar>
        </div>
    </div>
</template>

<script>
import ProgressBar from "@/controls/utility/progress-bar.vue";

export default {
    name: "plot-statuses",
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
.plotStatuses {
    position: absolute;
    width:100%;
    bottom: 0;
    pointer-events: auto;
}
</style>
