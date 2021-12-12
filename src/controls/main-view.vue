<template>
    <div class="grid grid-cols-10 lg:grid-cols-12 p-1 gap-1 dark:bg-gray-900" style="height: 100%;">
        <div id="left-column" class="col-span-3 lg:col-span-2">
            <div class="flex flex-col gap-1" style="height:100%;">
                <div class="iconBox">
                    <!-- Tool Icons -->
                    <tool-icons></tool-icons>
                </div>
                <!-- Bean List -->
                <bean-list class="farmBeanList flex-grow" :list="game.features.controller.filteredBeanList" :useFilter="true" ></bean-list>
              <div class="iconBox">
                    <!-- Additional Icons -->
                    <div class="flex flex-wrap gap-1 justify-center">
                        <div class="btn" style="height:32px;" @click="openModal(ModalType.Wiki)">
                            <icon class="has-tooltip" :bg="game.features.notifications.hasWikiNotification ? 'bg-red-500' : 'bg-icon'" :image="require(`@/assets/images/icons/Wiki Icon.png`)">
                                <tooltip position="top-left" :interactable="false">
                                <div class="text-center">Wiki</div>
                                </tooltip>
                            </icon>
                        </div>
                        <div class="btn" style="height:32px;" @click="openModal(ModalType.Achievements)">
                            <icon class="has-tooltip" :image="require(`@/assets/images/icons/Achievement Icon.png`)">
                                <tooltip position="top-left" :interactable="false">
                                <div class="text-center">Achievements</div>
                                </tooltip>
                            </icon>
                        </div>
                        <div class="btn" style="height:32px;" @click="openModal(ModalType.Prestige)">
                            <icon class="has-tooltip" :image="require(`@/assets/images/icons/Prestige Icon.png`)">
                                <tooltip position="top-left" :interactable="false">
                                <div class="text-center">Prestige</div>
                                </tooltip>
                            </icon>
                        </div>
                        <div class="btn" style="height:32px;" @click="openModal(ModalType.Settings)">
                            <icon class="has-tooltip" :image="require(`@/assets/images/icons/Settings Icon.png`)">
                                <tooltip position="top-left" :interactable="false">
                                <div class="text-center">Settings</div>
                                </tooltip>
                            </icon>
                        </div>
                    </div>
                </div>
                <!-- Log -->
                <log></log>
            </div>
        </div>
        <div id="middle-column" class="col-span-7 lg:col-span-5">
            <div class="flex flex-col gap-1" style="height:100%;">
                <div class="border2 flex-shrink flex flex-col" :style="farmStyle">
                    <!-- Title -->
                    <div style="height: 192px; pointer-events: none;">
                        <div style="max-width: 640px; margin:auto;">
                            <img :src="require(`@/assets/images/Title.png`)" style="width:100%;padding:0px 20px;"/>
                        </div>
                    </div>
                    <!-- Farm -->
                    <div class="mx-2 mb-2" style="min-height: 0;">
                        <div style="aspect-ratio:1;max-width:100%;max-height:100%;margin: auto;">
                            <farm></farm>
                        </div>
                    </div>
                </div>
                <!-- Farm Info -->
                <div class="">
                    <farm-control></farm-control>

                </div>
                <!-- Dev Panel -->
                <igt-developer-panel v-if="showDevPanel" :developerPanel="game.getDeveloperPanel()"/>
            </div>
        </div>
        <div id="right-column" class="col-span-10 lg:col-span-5">
            <div class="flex flex-col gap-1" style="height: 100%;">

            </div>
        </div>
    </div>
</template>

<script>
import {App} from "@/App.ts"

import {ModalType} from '@/scripts/GameController';

import ToolIcons from '@/controls/controller/tool-icons/tool-icons.vue';
import BeanList from '@/controls/controller/beanlist/bean-list.vue';
import Farm from '@/controls/farm/farm.vue';
import Log from '@/controls/log/log.vue';
import Icon from "@/controls/utility/icon.vue";
import FarmControl from "@/controls/farm/farm-control.vue";
import Tooltip from '@/controls/utility/tooltip.vue';
import { Game } from '@/Game';
import IgtDeveloperPanel from '@/components/developer-panel/igt-developer-panel.vue';

export default {
    components: {
        ToolIcons,
        BeanList,
        Farm,
        Log,
        Icon,
        FarmControl,
        Tooltip,
        IgtDeveloperPanel,
    },
    data() {
        return {
            ModalType,
        }
    },
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    computed: {
        showDevPanel() {
            return !App.inProduction;
        },
        darkMode() {
            return this.game.features.settings.getSetting('darkMode').value;
        },
        farmStyle() {
            return {
                'background-size': 'cover',
                'background-origin': 'border-box',
                'background-repeat': 'no-repeat',
                'background-image': this.game.features.farms.getFarm().background,
                'image-rendering': 'pixelated',
                'height': '60vh',
            };
        }
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

.iconBox {
    @apply flex flex-col-reverse;
}
/*
@media (min-width: 768px) {
    .iconBox {
        height: 192px;
    }
}
*/
.farmBeanList {
    flex-grow: 1;
    height: 0px;
    min-height: 320px;
}
</style>
