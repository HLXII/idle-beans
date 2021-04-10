<template>
    <div class="p-1" v-on:click="changeTool(toolType)">
        <icon :image=image 
            v-bind:class="{selected: selected, 
            unselected: !selected}"></icon>
    </div>
</template>

<script>
import GameController, {ToolType} from "@/scripts/GameController";
import Icon from "@/controls/icon";

export default {
  name: "tool-icons",
  components: {
    Icon,
  },
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
    image() {
      return require(`@/assets/images/${this.ToolType[this.toolType]} Icon.png`);
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
