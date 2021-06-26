<template>
    <div v-bind:class="entry.color">
        <game-text :text="entry.message" :controller="controller"/>
    </div>
</template>

<script>
import GameController from '@/scripts/GameController'
import gameText from '../game-text.vue'

export default {
  components: { gameText },
  name: "log-entry",
  props: {
      entry: {
          type: Object,
          required: true,
      },
      controller: {
          type: GameController,
          required: true,
      }
  },
}
</script>

<style scoped>

</style>
