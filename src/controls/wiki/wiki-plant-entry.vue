<template>
    <div class="flex mb-1" v-bind:class="{active: active}"
        v-on:click="changePlant(plant.name)">
        <svg-icon :icon="plant.icon"/>
        <div class="px-1"><span class="align-middle">{{plant.name}}</span></div>
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";
import Plant from "@/scripts/plant/Plant";
import SvgIcon from '@/controls/utility/svg-icon.vue';

export default {
  name: "wiki-bean-entry",
  components: {
    SvgIcon

  },
  props: {
    plant: {
      type: Plant,
      required: true,
    },
    controller: {
      type: GameController,
      required: true,
    },
    activePlant: {
      type: String,
      required: true,
    },
    changePlant: {
      type: Function,
      required: true,
    }
  },
  computed: {
    active() {
        return (this.activePlant == this.plant.name)
    },

  },
  methods: {

  },
}
</script>

<style scoped>
.active {
    background-color: red;
}
</style>
