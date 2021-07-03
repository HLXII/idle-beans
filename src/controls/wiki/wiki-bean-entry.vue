<template>
    <div class="flex mb-1" v-bind:class="{active: active}"
        v-on:click="changeBean(bean.name)">
        <icon :image=bean.image></icon>
        <div class="px-1"><span class="align-middle">{{bean.name}}</span></div>
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";
import Bean from "@/scripts/bean/Bean";
import Icon from "@/controls/utility/icon";

export default {
  name: "wiki-bean-entry",
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
        return (this.controller.wikiBean == this.bean.name)
    },
  },
  methods: {
      changeBean(bean) {
        this.controller.changeWikiBean(bean);
      }
  },
}
</script>

<style scoped>
.active {
    background-color: red;
}
</style>
