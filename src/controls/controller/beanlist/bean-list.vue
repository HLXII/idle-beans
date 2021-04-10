<template>
    <div class="overflow-auto" style="flex-grow: 1; height: 0px; min-height: 320px;">
        <div class="list-group" v-for="bean in filteredList" :key="bean.name">
            <bean-entry :bean=bean :controller=controller></bean-entry>
        </div>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import {ToolType} from "@/scripts/GameController";
import BeanEntry from './bean-entry.vue';

export default {
  name: "bean-list",
  components: {
      BeanEntry,
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
