<template>
    <div class="flex" v-bind:class="{active: active}"
        v-on:click="changeBean(bean.name)">
        <icon :image=bean.image></icon>
        <span class="p-1 align-self-center">{{bean.name}}</span>
        <small class="align-self-center flex-fill text-end">{{bean.amount}}</small>
    </div>
</template>

<script>
import GameController, {ToolType} from "@/scripts/GameController";
import Bean from "@/scripts/bean/Bean";
import Icon from "@/controls/icon";

export default {
  name: "igt-tool-icons",
  data() {
      return {
        ToolType,
      }
  },
  components: {
    Icon,
  },
  props: {
    bean: {
      type: Bean,
      required: true,
    },
    controller: {
      type: GameController,
      required: true,
    }
  },
  computed: {
    active() {
        return (this.controller.bean == this.bean.name) && (this.controller.tool == ToolType.Bean) 
    },
  },
  methods: {
      changeBean(bean) {
        this.controller.changeBean(bean);
      }
  },
}
</script>

<style scoped>
.active {
    background-color: red;
}
</style>
