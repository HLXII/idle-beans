<template>
  <div class="grid grid-cols-4" :class="{'dark': darkMode}">
    <igt-notifications></igt-notifications>
      <div id="left-column">
        <div class="flex flex-col" style="height: 100%;">
            <div style="height: 192px;">
                <!-- Bean Power -->
                <div class="p-1" style="text-align: center" v-on:click="changeToolTest()">
                    Bean Power
                </div>
                <igt-progress-bar :percentage="25"></igt-progress-bar>
                <!-- Tool Icons -->
                <igt-tool-icons></igt-tool-icons>
            </div>
            <!-- Bean List -->
            <bean-list></bean-list>
        </div>
      </div>
      <div id="middle-column" class="col-span-2">
          <!-- Farm -->
          <farm>
              <!-- Title -->
              <div class="row m-0 align-content-center" 
              style="height: 192px; position: absolute; top: 0; width:100%; pointer-events: none;">
                  <img :src="require(`@/assets/images/Title.png`)" style="width:100%;padding:0px;"/>
              </div>
          </farm>
      </div>
      <div id="right-column">
          <div class="flex flex-col" style="height: 100%;">
              <div style="height: 192px;">
                  <!-- Additional Icons -->
                  <div class="d-flex justify-content-center p-1">
                      <div class="p-1" data-bind="click: function() { controller.openWikiModal(); }">
                          <img data-bind="attr: { src: 'assets/images/Wiki Icon.png' }" width="32px" />
                      </div>
                      <div class="p-1" data-bind="click: function() { controller.openSettingsModal(); }">
                          <img data-bind="attr: { src: 'assets/images/Settings Icon.png' }" width="32px" />
                      </div>
                      <button type="button" class="btn btn-primary" data-bind="click: function() { testFunction(); }">Test</button>
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
import IgtNotifications from "@/components/util/igt-notifications";
import IgtProgressBar from './components/util/igt-progress-bar.vue';
import IgtToolIcons from './controls/controller/tool-icons/igt-tool-icons.vue';
import BeanList from '@/controls/controller/beanlist/bean-list.vue';
import Farm from '@/controls/farm/farm.vue';
import Log from '@/controls/log/log.vue';

export default {
  components: {
    IgtNotifications,
    IgtProgressBar,
    IgtToolIcons,
    BeanList,
    Farm,
    Log,
  },
  data() {
    return {
      game: App.game
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
</style>
