<template>
    <div class="view" :class="{'dark': darkMode}">
        <div class="viewWrapper">
            <main-view v-if="!game.features.prestige.prestiged" :game="game"/>
            <prestige-view v-if="game.features.prestige.prestiged" :game="game"/>
        </div>
        <plot-modal :show="openedModal == InfoType.Plot" @close="closeModal"/>
        <wiki-modal :show="openedModal == InfoType.Wiki" @close="closeModal"/>
        <settings-modal :show="openedModal == InfoType.Settings" @close="closeModal"/>
        <achievements-modal :show="openedModal == InfoType.Achievements" @close="closeModal"/>
        <prestige-modal :show="openedModal == InfoType.Prestige" @close="closeModal"/>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import {InfoType} from '@/scripts/GameController';

import PlotModal from '@/controls/farm/plot/plot-modal.vue';
import WikiModal from '@/controls/wiki/wiki-modal.vue';
import SettingsModal from '@/controls/settings/settings-modal.vue';
import AchievementsModal from './controls/achievements/achievements-modal.vue';
import PrestigeModal from './controls/prestige/prestige-modal.vue';
import MainView from './controls/main-view.vue';
import PrestigeView from './controls/prestige-view/prestige-view.vue';

export default {
    components: {
        PlotModal,
        WikiModal,
        SettingsModal,
        AchievementsModal,
        PrestigeModal,
        MainView,
        PrestigeView,
    },
    data() {
        return {
            game: App.game,
            InfoType,
        }
    },
    computed: {
        darkMode() {
            return this.game.features.settings.getSetting('darkMode').value;
        },
        openedModal() {
            return this.game.features.controller.openedModal;
        }
    },
    methods: {
        closeModal() {
            this.game.features.controller.closeModal();
        }
    },
}
</script>

<style>
html, body {
    margin: 0px;
    height: 100%;
}

.view {
    height: 100%;
}

/* Hide scrollbar for Chrome, Safari and Opera */
body::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
body {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.viewWrapper {
    width: 100%;
    height: 100%;
    @apply dark:bg-gray-900 dark:text-white;
}

</style>
