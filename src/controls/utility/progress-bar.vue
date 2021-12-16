<template>
  <div class="h-2 text-xs flex" :class="bgClass" v-tooltip="{content: tooltip}">
    <div :style="{'width' : percentage * 100 + '%'}"
         class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
         :class="fgClass"></div>
  </div>
</template>

<script>

export default {
  name: "progress-bar",
  components: {
  },
  props: {
    percentage: {
      type: Number,
      required: true,
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
}
</script>

<style scoped>

</style>
