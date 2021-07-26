<template>
    <div v-bind:class="entry.color">
        <game-text :text="entry.message" :wiki="wiki"/>
    </div>
</template>

<script>
import gameText from '@/controls/utility/game-text.vue'
import Wiki from '@/scripts/wiki/Wiki'

export default {
  components: { gameText },
  name: "log-entry",
  props: {
      entry: {
          type: Object,
          required: true,
      },
      wiki: {
          type: Wiki,
          required: true,
      }
  },
}
</script>

<style scoped>

</style>
