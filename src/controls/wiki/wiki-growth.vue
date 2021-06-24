<template>
    <div>
        <div>{{growth.plant}}</div>
        <game-text :text="growth.description" :controller="controller" />
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";
import Growth from "@/scripts/plant/growths/Growth";
import GameText from '../game-text.vue';

export default {
  name: "wiki-growth",
  components: {
    GameText,
  },
  props: {
    growth: {
      type: Growth,
      required: true,
    },
    controller: {
      type: GameController,
      required: true,
    }
  },
  computed: {

  },
  methods: {

  },
}
</script>

<style scoped>
</style>
