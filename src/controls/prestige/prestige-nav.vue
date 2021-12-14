<template>
    <div>
        <nav class="flex gap-1 mb-1">
            <nav-button class="flex-1" tabName="Prestige" :tabType=0 :changeTab="changeTab" :activeTab="prestigeTab"/>
            <nav-button class="flex-1" tabName="Modifiers" :tabType=1 :changeTab="changeTab" :activeTab="prestigeTab"/>
        </nav>
    </div>
</template>

<script>
import NavButton from "@/controls/utility/nav-button.vue";
import GameController, { TabType } from "@/scripts/GameController";

export default {
    name: "prestige-nav",
    components: {
        NavButton,
    },
    props: {
        controller: {
            type: GameController,
            required: true,
        },
    },
    methods: {
        changeTab: function(tab) {
            this.controller.changeTab(TabType.Prestige, tab);
        },
    },
    computed: {
        prestigeTab() {
            return this.controller.tabs[TabType.Prestige];
        },
    },
}
</script>

<style scoped>
</style>
