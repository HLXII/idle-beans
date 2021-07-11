<template>
    <div class="farmView">
        <div id="left-column">
            <div class="flex flex-col gap-1" style="height: 100%;">
                <div class="flex flex-col-reverse" style="height: 192px;">
                    <!-- Tool Icons -->
                    <tool-icons></tool-icons>
                </div>
                <!-- Bean List -->
                <bean-list class="farmBeanList" :list="game.features.controller.filteredBeanList" :useFilter="true" ></bean-list>
            </div>
        </div>
        <div id="middle-column" class="col-span-2 justify-self-center px-2" style="width:100%;">
                <div class="border2" :style="farmStyle">
                    <!-- Title -->
                    <div style="height: 192px; pointer-events: none; margin: 0;">
                        <img :src="require(`@/assets/images/Title.png`)" style="width:100%;padding:0px;"/>
                    </div>
                    <!-- Farm -->
                    <farm></farm>
                </div>
                <!-- Farm Info -->
                <div class="mt-3">
                    <farm-control></farm-control>
                </div>
                <!-- Dev Panel -->
                <igt-developer-panel v-if="showDevPanel" :developerPanel="game.getDeveloperPanel()"/>
        </div>
        <div id="right-column">
            <div class="flex flex-col gap-1" style="height: 100%;">
                <div class="flex flex-col-reverse" style="height: 192px;">
                    <!-- Additional Icons -->
                    <div class="flex flex-wrap gap-1 justify-center">
                        <div class="btn" style="height:32px;" @click="openModal(ModalType.Wiki)">
                            <icon class="has-tooltip" :image="require(`@/assets/images/icons/Wiki Icon.png`)">
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
.farmView {
    margin: auto;
    max-width: 1600px;
    @apply grid grid-cols-4 dark:bg-gray-900;
}

.farmBeanList {
    flex-grow: 1;
    height: 0px;
    min-height: 320px;
}
</style>
