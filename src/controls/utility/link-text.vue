<template>
    <span class="link" v-on:click="openWiki(link.type, link.id)">{{text}}</span>
</template>

<script>
import Wiki from '@/scripts/wiki/Wiki';

export default {
    name: "link-text",
    props: {
        link: {
            type: Object,
            required: true,
        },
        wiki: {
            type: Wiki,
            required: true,
        },
    },
    computed: {
        active() {
            return this.wiki.linkActive(this.link.type, this.link.id); 
        },
        text() {
            return this.active ? this.link.text : '???';
        }
    },
    methods: {
        openWiki(type, id) {
            if (this.active) {
                this.wiki.openWiki(type, id);
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
