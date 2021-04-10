<template>
    <div class="flex justify-center">
        <tool-icon :toolType=ToolType.Cursor :controller=controller></tool-icon>
        <tool-icon :toolType=ToolType.Bean :controller=controller></tool-icon>
        <tool-icon :toolType=ToolType.Sickle :controller=controller></tool-icon>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import {ToolType} from "@/scripts/GameController";
import ToolIcon from "@/controls/controller/tool-icons/tool-icon";

export default {
  name: "tool-icons",
  components: {
      ToolIcon,
  },
  data() {
    return {
      controller: App.game.features.controller,
      ToolType,
    }
  },
}
</script>

<style scoped>

</style>
