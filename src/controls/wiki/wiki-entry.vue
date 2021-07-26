<template>
    <div class="flex mb-1" v-bind:class="{active: active}" v-on:click="change(entry.name)">
        <!-- SVG Icons -->
        <svg-icon v-if="entry.icon" :icon="entry.icon"/>
        <!-- Img Icons -->
        <icon v-else :image="entry.image"></icon>
        <div class="px-1"><span class="align-middle">{{entry.name}}</span></div>
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";
import SvgIcon from '../utility/svg-icon.vue';
import Icon from '../utility/icon.vue';
 
export default {
  name: "wiki-entry",
  components: {
    SvgIcon,
    Icon,
  },
  props: {
    entry: {
      type: Object,
      required: true,
    },
    controller: {
      type: GameController,
      required: true,
    },
    activeEntry: {
      type: String,
      required: true,
    },
    change: {
      type: Function,
      required: true,
    }
  },
  computed: {
    active() {
        return (this.activeEntry == this.entry.name)
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
