<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <wiki-nav class="modal-header" :controller="controller" :notifications="notifications" />
            <wiki-info class="modal-body" 
                :controller="controller" 
                :wiki="wiki" 
                :beans="beans" 
                :farms="farms" 
                :notifications="notifications" 
                :plants="plants" />
            <div class="modal-footer"></div>
        </div>
    </modal>
</template>

<script>
import { App } from "@/App.ts"
import Modal from "@/controls/modal/modal.vue";
import WikiNav from './wiki-nav.vue';
import WikiInfo from './wiki-info.vue';

export default {
    name: "wiki-modal",
    data() {
        return {
            plants: App.game.features.plants,
            beans: App.game.features.beans,
            farms: App.game.features.farms,
            controller: App.game.features.controller,
            wiki: App.game.features.wiki,
            notifications: App.game.features.notifications,
        }
    },
    components: {
        Modal,
        WikiNav,
        WikiInfo,
    },
    props: {
        show: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        close: function() {
            this.$emit('close');
        },
    },
}
</script>

<style scoped>

</style>
