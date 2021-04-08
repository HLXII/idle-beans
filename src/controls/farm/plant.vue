<template>
    <div class="plant" style="position: absolute; pointer-events: none;"
        v-bind:style="style">
        <component v-bind:is=plant.image :row=plant.row :col=plant.col :controller=controller ></component>
    </div>
</template>

<script>
import AbstractFarm from "@/scripts/farm/AbstractFarm";
import GameController from "@/scripts/GameController";
import PlantState from "@/scripts/plant/PlantState";

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
            type: AbstractFarm,
            required: true,
        },
        controller: {
            type: GameController,
            required: true,
        },
        plant: {
            type: PlantState,
        }
    },
  computed: {
      width() {
          return `${100 / this.farms.plots.length}%`;
      },
      style() {
          return {
              bottom: '0%',
              'padding-bottom': `${((this.farm.plots.length - this.plant.row - 1) * 100 / this.farm.plots.length)}%`,
              left: `${this.plant.col * 100 / this.farm.plots.length}%`,
              width: `${100 / this.farm.plots.length}%`,
          };
      },
      image() {
          return this.plant.image;
      }
  }
}
</script>

<style scoped>
    .plot:hover {
        filter: brightness(.5);
    }
    .plantImage:hover {
        filter: brightness(.5);
    }
</style>
