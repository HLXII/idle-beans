<template>
    <span class="link" v-on:click="openWiki(link.type, link.id)">{{text}}</span>
</template>

<script>
import GameController from "@/scripts/GameController";

export default {
    name: "link-text",
    props: {
        link: {
            type: Object,
            required: true,
        },
        controller: {
            type: GameController,
            required: true,
        },
    },
    computed: {
        active() {
            return this.controller.linkActive(this.link.type, this.link.id); 
        },
        text() {
            return this.active ? this.link.text : '???';
        }
    },
    methods: {
        openWiki(type, id) {
            if (this.active) {
                this.controller.openWiki(type, id);
            }
        }
    },
}
</script>

<style scoped>
.link {
    font-weight: 500;
}
</style>
