<template>
    <div class="plant" style="position: absolute; pointer-events: none;" v-if="plot.plant"
        v-bind:style="style">
        <div v-if="plot.plant">
            <component v-bind:is="image" :row=plot.row :col=plot.col :controller=controller></component>
        </div>
    </div>
</template>

<script>
import Farm from "@/scripts/farm/Farm";
import GameController from "@/scripts/GameController";
import Plot from "@/scripts/farm/Plot";

import BeanBud from "@/controls/plant/BeanBud";

export default {
  name: "plant",
  components: {
      BeanBud,
  },
  data() {
    return {
    }
  },
    props: {
        farm: {
            type: Farm,
            required: true,
        },
        controller: {
            type: GameController,
            required: true,
        },
        plot: {
            type: Plot,
        }
    },
  computed: {
      width() {
          return `${100 / this.farm.plots.length}%`;
      },
      style() {
          return {
              bottom: '0%',
              'padding-bottom': `${((this.farm.plots.length - this.plot.row - 1) * 100 / this.farm.plots.length)}%`,
              left: `${this.plot.col * 100 / this.farm.plots.length}%`,
              width: `${100 / this.farm.plots.length}%`,
          };
      },
      image() {
          return this.plot.plant.image;
      }
  }
}
</script>

<style scoped>
    .plot:hover {
        filter: brightness(.5);
    }
</style>
