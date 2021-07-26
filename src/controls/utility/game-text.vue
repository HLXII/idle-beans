<template>
    <span>
        <template v-for="(elm, index) in text">
            <span :key="index" v-if="typeof elm === 'string'" v-html="elm"></span>
            <link-text :key="index" v-else :link="elm" :wiki="wiki"/>
        </template>
    </span>
</template>

<script>
import LinkText from './link-text.vue';
import Wiki from '@/scripts/wiki/Wiki';

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
        wiki: {
            type: Wiki,
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
