<template>
    <div class="flex" v-bind:class="{active: active}"
        v-on:click="changeBean(bean.name)">
        <div style="position: relative;">
            <img style="position: absolute;" width="32px" :src="require(`@/assets/images/back.png`)"/>
            <img style="position: relative;" width="32px" :src="require(`@/${bean.image}`)"/>
        </div>
        <span class="p-1 align-self-center">{{bean.name}}</span>
        <small class="align-self-center flex-fill text-end">{{bean.amount}}</small>
    </div>
</template>

<script>
import GameController, {ToolType} from "@/scripts/GameController";
import Bean from "@/scripts/bean/Bean";

export default {
  name: "igt-tool-icons",
  data() {
      return {
        ToolType,
      }
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
