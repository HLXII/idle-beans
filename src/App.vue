<template>
  <div>
    <div class="grid grid-cols-4" style="margin: auto; max-width: 1600px;" :class="{'dark': darkMode}">
      <igt-notifications></igt-notifications>
      <div id="left-column">
        <div class="flex flex-col" style="height: 100%;">
            <div class="flex flex-col-reverse" style="height: 192px;">
                <!-- Tool Icons -->
                <tool-icons class="flex justify-center m-1" style="height: 32px;"></tool-icons>
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
          <farm-control></farm-control>
          <!-- Dev Panel -->
          <!-- TODO -->
      </div>
      <div id="right-column">
          <div class="flex flex-col" style="height: 100%;">
              <div class="flex flex-col-reverse" style="height: 192px;">
                  <!-- Additional Icons -->
                  <div class="flex justify-center m-1" style="height: 32px;">
                      <div class="px-1" @click="openWikiModal">
                          <icon class="btn" :image="require(`@/assets/images/icons/Wiki Icon.png`)"></icon>
                      </div>
                      <div class="px-1" @click="openSettingsModal">
                          <icon class="btn" :image="require(`@/assets/images/icons/Settings Icon.png`)"></icon>
                      </div>
                  </div>
              </div>
              <!-- Log -->
              <log></log>
          </div>
      </div>
      <plot-modal :show="game.features.controller.openedModal == ModalType.Plot" @close="closeModal"></plot-modal>
      <wiki-modal :show="game.features.controller.openedModal == ModalType.Wiki" @close="closeModal"></wiki-modal>

    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts"
import IgtNotifications from "@/components/util/igt-notifications";
import ToolIcons from './controls/controller/tool-icons/tool-icons.vue';
import BeanList from '@/controls/controller/beanlist/bean-list.vue';
import Farm from '@/controls/farm/farm.vue';
import Log from '@/controls/log/log.vue';
import PlotModal from '@/controls/farm/plot-modal/plot-modal';
import WikiModal from '@/controls/wiki/wiki-modal';
import {ModalType} from '@/scripts/GameController';
import Icon from "@/controls/icon";
import FarmControl from "@/controls/farm/farm-control";

export default {
  components: {
    IgtNotifications,
    ToolIcons,
    BeanList,
    Farm,
    Log,
    PlotModal,
    WikiModal,
    Icon,
    FarmControl,
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
    darkMode() {
      return App.game.features.settings.darkMode.value;
    },
  },
  methods: {
    openWikiModal() {
      this.game.features.controller.openWikiModal();
    },
    openSettingsModal() {
      this.game.features.controller.openSettingsModal();
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
