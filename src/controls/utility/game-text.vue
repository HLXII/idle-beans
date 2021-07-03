<template>
    <span>
        <template v-for="(elm, index) in text">
            <span :key="index" v-if="typeof elm === 'string'" v-html="elm"></span>
            <link-text :key="index" v-else :link="elm" :controller="controller"/>
        </template>
    </span>
</template>

<script>
import GameController from "@/scripts/GameController";
import LinkText from './link-text.vue';

export default {
    name: "game-text",
    components: {
        LinkText
    },
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
}
</script>

<style scoped>
.link {
    font-weight: 500;
}
</style>
