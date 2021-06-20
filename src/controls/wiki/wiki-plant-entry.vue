<template>
    <div class="flex mb-1" v-bind:class="{active: active}"
        v-on:click="changePlant(plant.name)">
        <div class="border2 bg-generic" style="width: 28px; height: 28px;">
            <div style="position: relative; left: -6px; top: -6px;">
                <svg width=32px xmlns="http://www.w3.org/2000/svg" :viewBox="plant.icon.viewBox" shape-rendering="crispEdges">
                    <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
                    <path v-for="path in plant.icon.paths" v-bind:key="path.stroke" pointer-events="painted" :stroke="path.stroke" :d="path.d" />
                </svg>
            </div>
        </div>
        <div class="px-1"><span class="align-middle">{{plant.name}}</span></div>
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";
import Plant from "@/scripts/plant/Plant";

export default {
  name: "wiki-bean-entry",
  components: {

  },
  props: {
    plant: {
      type: Plant,
      required: true,
    },
    controller: {
      type: GameController,
      required: true,
    }
  },
  computed: {
    active() {
        return (this.controller.wikiPlant == this.plant.name)
    },
  },
  methods: {
      changePlant(plant) {
        this.controller.changeWikiPlant(plant);
      }
  },
}
</script>

<style scoped>
.active {
    background-color: red;
}
</style>
