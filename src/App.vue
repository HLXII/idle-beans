<template>
    <div :class="{'dark': darkMode}">
        <div class="viewWrapper">
            <main-view v-if="!game.features.prestige.prestiged" :game="game"/>
            <prestige-view v-if="game.features.prestige.prestiged" :game="game"/>
        </div>
        <plot-modal :show="game.features.controller.openedModal == ModalType.Plot" @close="closeModal"/>
        <wiki-modal :show="game.features.controller.openedModal == ModalType.Wiki" @close="closeModal"/>
        <settings-modal :show="game.features.controller.openedModal == ModalType.Settings" @close="closeModal"/>
        <achievements-modal :show="game.features.controller.openedModal == ModalType.Achievements" @close="closeModal"/>
        <prestige-modal :show="game.features.controller.openedModal == ModalType.Prestige" @close="closeModal"/>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import {ModalType} from '@/scripts/GameController';

import PlotModal from '@/controls/farm/plot-modal/plot-modal.vue';
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
            ModalType,
        }
    },
    computed: {
        darkMode() {
            return App.game.features.settings.getSetting('darkMode').value;
        },
    },
    methods: {
        openModal(modalType) {
            this.game.features.controller.openModal(modalType);
        },
        closeModal() {
            this.game.features.controller.closeModal();
        }
    },
}
</script>

<style>
.viewWrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    @apply dark:bg-gray-900 dark:text-white;
}

.farmView {
    margin: auto;
    max-width: 1600px;
    @apply grid grid-cols-4 dark:bg-gray-900;
}
</style>
