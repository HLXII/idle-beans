<template>
    <div class="flex flex-col border2 bg-generic" style="flex-grow: 1; height: 0px; min-height: 320px;">
        <div class="mb-1 flex" style="height: 32px;">
            <div class="border2 bg-white text-center flex-1">Search here</div>
            <icon></icon>
        </div>
        <div class="overflow-auto" >
            <bean-entry v-for="bean in filteredList" :key="bean.name" :bean=bean :controller=controller></bean-entry>
        </div>
    </div>

</template>

<script>
import {App} from "@/App.ts"
import {ToolType} from "@/scripts/GameController";
import BeanEntry from './bean-entry.vue';
import Icon from "@/controls/icon";

export default {
  name: "bean-list",
  components: {
      BeanEntry,
      Icon,
  },
  data() {
    return {
      controller: App.game.features.controller,
      ToolType,
    }
  },
  computed: {
      filteredList() {
          return this.controller.filteredList;
      }
  }
}
</script>

<style scoped>

</style>
