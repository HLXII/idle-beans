<template>
    <div style="position: relative;">
        <!-- Dirt Layer -->
        <div class="farm" style="padding-top:192px;">
            <div class="farm-row flex" v-for="(row, yIdx) in farm.plots" :key="yIdx">
                <div class="plot" div v-for="(plot, xIdx) in row" :key="xIdx"
                    v-bind:style="{width: width}"
                    v-on:click="controller.clickDirt(yIdx, xIdx)">
                    <img :src="require(`@/assets/images/Dirt.png`)" width="100%"/>
                </div>
            </div>
        </div>
    
        <!-- Plant Layer -->
        <div class="plants">
            <plant v-for="(plot, idx) in flatPlots" :key="idx" :plot=plot :farm=farm :controller=controller></plant>
        </div>
        
        <slot></slot>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import Plant from "@/controls/farm/plant";

export default {
  name: "farm",
  components: {
      Plant,
  },
  data() {
    return {
      farm: App.game.features.farm,
      controller: App.game.features.controller,
    }
  },
  computed: {
      width() {
          return `${100 / this.farm.plots.length}%`;
      },
      flatPlots() {
          return this.farm.plots.flat();
      },
  }
}
</script>

<style scoped>
    .plot:hover {
        filter: brightness(.5);
    }
</style>
