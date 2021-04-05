<template>
    <div class="p-1" v-on:click="changeTool(toolType)">
        <img :src="require(`@/assets/images/${ToolType[toolType]} Icon.png`)"
        v-bind:class="{selected: selected, 
            unselected: !selected}"
            width="32px" />
    </div>
</template>

<script>
import GameController, {ToolType} from "@/scripts/GameController";

export default {
  name: "igt-tool-icons",
  data() {
      return {
        ToolType,
      }
  },
  props: {
    toolType: {
      type: Number,
      required: true,
    },
    controller: {
      type: GameController,
      required: true,
    }
  },
  computed: {
    selected() {
      return this.toolType === this.controller.tool;
    },
  },
  methods: {
      changeTool(tool) {
        this.controller.changeTool(tool);
      }
  },
}
</script>

<style scoped>
.selected {
    outline: none;
    border-color: #dfff2d;
    box-shadow: 0 0 10px #9ecaed;
}
</style>
