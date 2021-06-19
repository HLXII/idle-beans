<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
                <nav class="flex flex-col sm:flex-row mb-2">
                    <wiki-nav-tab tabName="Beans" :tabType=0 :controller="controller"></wiki-nav-tab>
                    <wiki-nav-tab tabName="Plants" :tabType=1 :controller="controller"></wiki-nav-tab>
                </nav>
            </div>
            <div class="modal-body">
                <wiki-tab :tabType="0" :controller="controller">
                    <icon-toggle :setting="darkMode"
                    :trueIcon="require(`@/assets/images/icons/Status Bar Icon.png`)"
                    :falseIcon="require(`@/assets/images/icons/No Status Bar Icon.png`)"
                    :trueTooltip="`Dark Mode`"
                    :falseTooltip="`Light Mode`"></icon-toggle>
                </wiki-tab>
                <wiki-tab :tabType="1" :controller="controller">

                </wiki-tab>
            </div>
            <div class="modal-footer">

            </div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal";
import {App} from "@/App.ts"
import WikiNavTab from "@/controls/wiki/wiki-nav-tab";
import WikiTab from '../wiki/wiki-tab.vue';
import IconToggle from '@/controls/settings/icon-toggle';

export default {
    name: "wiki-modal",
    data() {
        return {
            controller: App.game.features.controller,
            settings: App.game.features.settings,
        }
    },
    components: {
        Modal,
        WikiNavTab,
        WikiTab,
        IconToggle
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
        darkMode() {
            return this.settings.getSetting('darkMode');
        }
    },
}
</script>

<style scoped>

</style>
