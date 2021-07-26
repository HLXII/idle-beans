<template>
    <tr>
        <td class="simple-status-label" colspan="2"><span class="whitespace-nowrap">{{status.label}}:</span></td>
        <td><border-progress-bar :fgClass="`bg-${status.color}-500`" :bgClass="`bg-${status.color}-200`" :percentage="status.percent" :text="status.text"/></td>
    </tr>
</template>

<script>
import BorderProgressBar from '@/controls/utility/border-progress-bar.vue';
import Status from '@/scripts/entity/Status';

export default {
    name: "status",
    components: {
        BorderProgressBar
    },
    props: {
        status: {
            type: Status,
            required: true,
        },
    },
}
</script>

<style>
.simple-status-label {
    width: 1%;
    padding-right: 10px !important;
}
</style>
