<template>
    <div class="m-1 btn" style="height: 32px;" v-on:click="changeTool(toolType)">
        <icon :image=image :bg="selectedBG"></icon>
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
      return require(`@/assets/images/icons/${this.ToolType[this.toolType]} Icon.png`);
    },
    selectedBG() {
      return this.selected ? 'bg-red-500' : 'bg-icon';
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
</style>
