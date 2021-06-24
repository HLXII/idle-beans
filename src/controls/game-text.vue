<template>
    <span>
        <template v-for="(elm, index) in text">
            <span :key="index" v-if="typeof elm === 'string'" v-html="elm"></span>
            <span :key="index" v-else style="font-weight: 500" v-on:click="openWiki(elm.type, elm.id)">{{elm.text}}</span>
        </template>
    </span>
</template>

<script>
import GameController from "@/scripts/GameController";

export default {
    name: "game-text",
    props: {
        text: {
            type: Array,
            required: true,
        },
        controller: {
            type: GameController,
            required: true,
        }
    },
    computed: {

    },
    methods: {
        openWiki(type, id) {
            this.controller.openWiki(type, id);
        }
    },
}
</script>

<style scoped>
</style>
