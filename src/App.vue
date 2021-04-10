<template>
  <div>
    <div class="grid grid-cols-4" style="margin: auto; max-width: 1280px;" :class="{'dark': darkMode}">
      <igt-notifications></igt-notifications>
      <div id="left-column">
        <div class="flex flex-col" style="height: 100%;">
            <div style="height: 192px;">
                <!-- Tool Icons -->
                <igt-tool-icons></igt-tool-icons>
            </div>
            <!-- Bean List -->
            <bean-list class="border2"></bean-list>
        </div>
      </div>
      <div id="middle-column" class="col-span-2 justify-self-center" style="width:100%; max-width: 640px; padding: 0 20px;">
          <!-- Farm -->
          <farm>
              <!-- Title -->
              <div class="row m-0 align-content-center" 
              style="height: 192px; position: absolute; top: 0; width:100%; pointer-events: none;">
                  <img :src="require(`@/assets/images/Title.png`)" style="width:100%;padding:0px;"/>
              </div>
          </farm>
          <!-- Farm Info -->
          <!-- TODO -->
      </div>
      <div id="right-column">
          <div class="flex flex-col" style="height: 100%;">
              <div style="height: 192px;">

                  <button type="button" class="border2"  @click="game.features.controller.showPlotModal = true">Test</button>
                  <div class="btn btn-blue">TEST</div>
                  <!-- Additional Icons -->
                  <div class="flex justify-content-center p-1">
                      <div class="p-1" data-bind="click: function() { controller.openWikiModal(); }">
                          <img :src="require(`@/assets/images/Wiki Icon.png`)" width="32px" />
                      </div>
                      <div class="p-1" data-bind="click: function() { controller.openSettingsModal(); }">
                          <img :src="require(`@/assets/images/Settings Icon.png`)" width="32px" />
                      </div>
                  </div>
              </div>
              <!-- Log -->
              <log class="border2"></log>
          </div>
      </div>
      <plot-modal :show="game.features.controller.showPlotModal" @close="game.features.controller.showPlotModal = false"></plot-modal>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts"
import IgtNotifications from "@/components/util/igt-notifications";
import IgtToolIcons from './controls/controller/tool-icons/igt-tool-icons.vue';
import BeanList from '@/controls/controller/beanlist/bean-list.vue';
import Farm from '@/controls/farm/farm.vue';
import Log from '@/controls/log/log.vue';
import PlotModal from '@/controls/farm/plot-modal/plot-modal';

export default {
  components: {
    IgtNotifications,
    IgtToolIcons,
    BeanList,
    Farm,
    Log,
    PlotModal,
  },
  data() {
    return {
      game: App.game,
      showTestModal: false,
    }
  },
  computed: {
    showDevPanel() {
      return !App.inProduction;
    },
    darkMode() {
      return App.game.features.settings.darkMode.value;
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
