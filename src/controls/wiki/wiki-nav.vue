<template>
    <div>
        <nav class="flex gap-1 mb-1">
            <nav-button class="flex-1" :class="{notification: notifications.hasBeansNotification}" tabName="Beans" :tabType=0 :changeTab="changeTab" :activeTab="wikiTab"/>
            <nav-button class="flex-1" :class="{notification: notifications.hasPlantsNotification}" tabName="Plants" :tabType=1 :changeTab="changeTab" :activeTab="wikiTab"/>
            <nav-button class="flex-1" tabName="Farms" :tabType=2 :changeTab="changeTab" :activeTab="wikiTab"/>
        </nav>
    </div>
</template>

<script>
import NavButton from "@/controls/utility/nav-button.vue";
import GameController, { TabType } from "@/scripts/GameController";
import Notifications from '@/scripts/notifications/Notifications';

export default {
    name: "wiki-nav",
    components: {
        NavButton,
    },
    props: {
        controller: {
            type: GameController,
            required: true,
        },
        notifications: {
            type: Notifications,
            required: true,
        },
    },
    methods: {
        changeTab: function(tab) {
            this.controller.changeTab(TabType.Wiki, tab);
        },
    },
    computed: {
        wikiTab() {
            return this.controller.tabs[TabType.Wiki];
        },
    },
}
</script>

<style scoped>

.notification {
    font-weight: bold;
}

</style>
