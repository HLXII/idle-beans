<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
                <nav class="flex flex-col sm:flex-row">
                    <wiki-nav-tab tabName="Beans" :tabType=0 :controller="controller"></wiki-nav-tab>
                    <wiki-nav-tab tabName="Plants" :tabType=1 :controller="controller"></wiki-nav-tab>
                </nav>
            </div>
            <div class="modal-body">
                <wiki-tab :tabType="0" :controller="controller">
                    <div class="overflow-auto" >
                        <bean-entry v-for="bean in filteredList" :key="bean.name" :bean=bean :controller=controller></bean-entry>
                    </div>
                </wiki-tab>
                <wiki-tab :tabType="1" :controller="controller">
                    Plants
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
import WikiTab from './wiki-tab.vue';
import BeanEntry from '@/controls/controller/beanlist/bean-entry';

export default {
    name: "wiki-modal",
    data() {
        return {
            plants: App.game.features.plants,
            beans: App.game.features.beans,
            controller: App.game.features.controller,
        }
    },
    components: {
        Modal,
        WikiNavTab,
        WikiTab,
        BeanEntry,
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
        filteredList() {
            return this.controller.wikiBeanList;
        }
    },
}
</script>

<style scoped>

</style>
