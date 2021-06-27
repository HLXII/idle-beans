<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
                Prestige
            </div>
            <div class="modal-body">
                <div>
                    TODO: Figure out description for prestige
                </div>
                <prestige v-for="(prestige, idx) in visiblePrestiges" :key="idx" :prestige="prestige" :controller="controller"/>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal.vue";
import {App} from "@/App.ts"
import Prestige from './prestige.vue';

export default {
    name: "prestige-modal",
    data() {
        return {
            prestige: App.game.features.prestige,
            controller: App.game.features.controller,
        }
    },
    components: {
        Modal,
        Prestige,
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
    computed: {
        visiblePrestiges() {
            return this.prestige.prestiges.filter((prestige) => prestige.visible);
        }
    },
}
</script>

<style scoped>
</style>
