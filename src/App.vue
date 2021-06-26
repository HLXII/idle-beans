<template>
  <div>
    <div class="grid grid-cols-4" style="margin: auto; max-width: 1600px;">
      <igt-notifications></igt-notifications>
      <div id="left-column">
        <div class="flex flex-col" style="height: 100%;">
            <div class="flex flex-col-reverse" style="height: 192px;">
                <!-- Tool Icons -->
                <tool-icons></tool-icons>
            </div>
            <!-- Bean List -->
            <bean-list></bean-list>
        </div>
      </div>
      <div id="middle-column" class="col-span-2 justify-self-center px-2" style="width:100%;">
          <div class="border2">
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
          <!-- TODO -->
      </div>
      <div id="right-column">
          <div class="flex flex-col" style="height: 100%;">
              <div class="flex flex-col-reverse" style="height: 192px;">
                  <!-- Additional Icons -->
                  <div class="flex flex-wrap justify-center">
                      <div class="btn m-1" style="height:32px;" @click="openModal(ModalType.Wiki)">
                          <icon class="has-tooltip" :image="require(`@/assets/images/icons/Wiki Icon.png`)">
                            <tooltip position="top-left" :interactable="false">
                              <div class="text-center">Wiki</div>
                            </tooltip>
                          </icon>
                      </div>
                      <div class="btn m-1" style="height:32px;" @click="openModal(ModalType.Achievements)">
                          <icon class="has-tooltip" :image="require(`@/assets/images/icons/Achievement Icon.png`)">
                            <tooltip position="top-left" :interactable="false">
                              <div class="text-center">Achievements</div>
                            </tooltip>
                          </icon>
                      </div>
                      <div class="btn m-1" style="height:32px;" @click="openModal(ModalType.Prestige)">
                          <icon class="has-tooltip" :image="require(`@/assets/images/icons/Prestige Icon.png`)">
                            <tooltip position="top-left" :interactable="false">
                              <div class="text-center">Prestige</div>
                            </tooltip>
                          </icon>
                      </div>
                      <div class="btn m-1" style="height:32px;" @click="openModal(ModalType.Settings)">
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

import IgtNotifications from "@/components/util/igt-notifications.vue";
import ToolIcons from './controls/controller/tool-icons/tool-icons.vue';
import BeanList from '@/controls/controller/beanlist/bean-list.vue';
import Farm from '@/controls/farm/farm.vue';
import Log from '@/controls/log/log.vue';
import PlotModal from '@/controls/farm/plot-modal/plot-modal.vue';
import WikiModal from '@/controls/wiki/wiki-modal.vue';
import SettingsModal from '@/controls/settings/settings-modal.vue';
import Icon from "@/controls/icon.vue";
import FarmControl from "@/controls/farm/farm-control.vue";
import AchievementsModal from './controls/achievements/achievements-modal.vue';
import PrestigeModal from './controls/prestige/prestige-modal.vue';
import Tooltip from '@/controls/tooltip.vue';

export default {
  components: {
    IgtNotifications,
    ToolIcons,
    BeanList,
    Farm,
    Log,
    PlotModal,
    WikiModal,
    SettingsModal,
    Icon,
    FarmControl,
    AchievementsModal,
    PrestigeModal,
    Tooltip,
  },
  data() {
    return {
      game: App.game,
      ModalType,
    }
  },
  computed: {
    showDevPanel() {
      return !App.inProduction;
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
/* Let's get this party started */
::-webkit-scrollbar {
    width: 8px;
}
 
/* Track */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(138, 120, 86, 0.705); 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    margin: 5px 0;
    border: solid;
    border-width: 10px 0 10px 15px;
  background: rgba(255,0,0,0.4); 
}
::-webkit-scrollbar-thumb:window-inactive {
	background: rgba(255,0,0,0.4); 
}
</style>
