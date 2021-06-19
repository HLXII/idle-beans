<template>
    <div v-show="active">
        <slot></slot>
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";

export default {
    name: "wiki-tab",
    props: {
        tabType: {
            type: Number,
            required: true,
        },
        controller: {
            type: GameController,
            required: true,
        }
    },
    computed: {
        active() {
            return this.tabType == this.controller.wikiTab;
        },
    },
}
</script>

<style scoped>

</style>
