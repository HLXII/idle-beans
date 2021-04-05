<template>
    <div class="flex justify-center">
        <igt-tool-icon :toolType=ToolType.Cursor :controller=controller></igt-tool-icon>
        <igt-tool-icon :toolType=ToolType.Bean :controller=controller></igt-tool-icon>
        <igt-tool-icon :toolType=ToolType.Sickle :controller=controller></igt-tool-icon>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import {ToolType} from "@/ig-template/features/GameController";
import IgtToolIcon from "@/components/features/controller/tool-icons/igt-tool-icon";

export default {
  name: "igt-tool-icons",
  components: {
      IgtToolIcon,
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
