<template>
    <div>
        <nav class="flex gap-1 mb-1">
            <nav-button class="flex-1" tabName="Base" :tabType=0 :changeTab="changeTab" :activeTab="settingsTab"/>
            <nav-button class="flex-1" tabName="Prestige" :tabType=1 :changeTab="changeTab" :activeTab="settingsTab"/>
            <nav-button class="flex-1" tabName="Save" :tabType=2 :changeTab="changeTab" :activeTab="settingsTab"/>
        </nav>
    </div>
</template>

<script>
import NavButton from "@/controls/utility/nav-button.vue";
import GameController, { TabType } from "@/scripts/GameController";

export default {
    name: "settings-nav",
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
            this.controller.changeTab(TabType.Settings, tab);
        },
    },
    computed: {
        settingsTab() {
            return this.controller.tabs[TabType.Settings];
        },
    },
}
</script>

<style scoped>

</style>
