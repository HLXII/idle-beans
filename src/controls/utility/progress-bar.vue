<template>
  <div class="h-2 text-xs flex" :class="[bgClass, tooltip ? 'has-tooltip' : '']">
    <tooltip v-if="tooltip" position="bottom-right" style="top: 100%;">
        {{ tooltip }}
    </tooltip>
    <div :style="{'width' : percentage * 100 + '%'}"
         class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
         :class="fgClass"></div>

  </div>
</template>

<script>
import Tooltip from "@/controls/utility/tooltip.vue";

export default {
  name: "progress-bar",
  components: {
      Tooltip,
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
