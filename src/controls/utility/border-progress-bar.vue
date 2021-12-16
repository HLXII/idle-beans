<template>
  <div class="bpb-container" v-tooltip="tooltip">
    <div class="bpb-bar">
        <div class="flex flex-col text-center whitespace-nowrap text-white justify-center" :class="fgClass" :style="style">
            {{text}}
        </div>
    </div>
    <div class="bpb-border border2" :class="bgClass" />
  </div>
</template>

<script>

export default {
    name: "border-progress-bar",
    components: {

    },
    props: {
        percentage: {
            type: Number,
            required: true,
        },
        text: {
            type: String,
        },
        bgClass: {
            type: String,
            default: 'bg-pink-200'
        },
        fgClass: {
            type: String,
            default: 'bg-pink-500'
        },
        tooltip: {
            type: String,
        }
    },
    computed: {
        style() {
            return {
                width: `${this.percentage * 100}%`,
                height: '100%',
            };
        },
    },
}
</script>

<style scoped>
.bpb-container {
    position: relative;
}
.bpb-border {
    height: 24px;
}
.bpb-bar {
    position: absolute;
    width: 100%;
    height: 24px;
    padding: 0px 2px;
}
</style>
