<template>
    <div class="flex" v-bind:class="{active: active}"
        v-on:click="changeBean(bean.name)">
        <icon :image=bean.image></icon>
        <div class="px-1"><span class="align-middle">{{bean.name}}</span></div>
        <div class="flex-1 text-right"><small class="align-middle">{{bean.amount}}</small></div>
    </div>
</template>

<script>
import GameController, {ToolType} from "@/scripts/GameController";
import Bean from "@/scripts/bean/Bean";
import Icon from "@/controls/utility/icon.vue";

export default {
  name: "bean-entry",
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
    },
    focusable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    active() {
        if (!this.focusable) {
          return false;
        }
        return (this.controller.bean == this.bean.name) && (this.controller.tool == ToolType.Bean) 
    },
  },
  methods: {
      changeBean(bean) {
        if (!this.focusable) {
          return;
        }
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
