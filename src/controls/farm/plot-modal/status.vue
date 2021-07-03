<template>
    <tr>
        <td class="simple-status-label" colspan="2"><span class="whitespace-nowrap">{{label}}</span></td>
        <td><border-progress-bar :percentage="percent" :text="text"/></td>
    </tr>
</template>

<script>
import BorderProgressBar from '@/controls/utility/border-progress-bar.vue';

export default {
    name: "status",
    components: {
        BorderProgressBar
    },
    props: {
        label: {
            type: String,
            required: true,
        },
        percent: {
            type: Number,
            require: true,
        },
        text: {
            type: String,
        }
    },
}
</script>

<style>
.simple-status-label {
    width: 1%;
    padding-right: 10px !important;
}
</style>
