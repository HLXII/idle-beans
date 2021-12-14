<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <settings-nav class="modal-header" :controller="controller" />
            <settings-info class="modal-body" :controller="controller" :settings="settings" />
            <div class="modal-footer"></div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal.vue";
import { App } from "@/App.ts"
import SettingsNav from './settings-nav.vue';
import SettingsInfo from './settings-info.vue';

export default {
    name: "settings-modal",
    data() {
        return {
            controller: App.game.features.controller,
            settings: App.game.features.settings,
        }
    },
    components: {
        Modal,
        SettingsNav,
        SettingsInfo,
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
