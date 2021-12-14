<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <prestige-nav class="modal-header" :controller="controller" />
            <prestige-info class="modal-body" :controller="controller" :prestige="prestige" :wiki="wiki" />
            <div class="modal-footer"></div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal.vue";
import {App} from "@/App.ts"
import PrestigeNav from './prestige-nav.vue';
import PrestigeInfo from './prestige-info.vue';

export default {
    name: "prestige-modal",
    data() {
        return {
            prestige: App.game.features.prestige,
            controller: App.game.features.controller,
            wiki: App.game.features.wiki,
        }
    },
    components: {
        Modal,
        PrestigeNav,
        PrestigeInfo,
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
