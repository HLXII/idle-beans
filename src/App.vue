<template>
  <div class="grid grid-cols-3" :class="{'dark': darkMode}">
    <igt-notifications></igt-notifications>
      <div id="left-column" style="max-width: 320px;">
        <div class="d-flex flex-column" style="height: 100%;">
            <div class="row m-0 justify-content-center align-content-end" style="height: 192px;">
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
      <div id="middle-column" class="p-0 col-12 col-sm-12 col-md-6 col-lg-6 order-sm-1 order-md-2" style="max-width: 640px;">
          <!-- Farm -->
          <farm>
              <!-- Title -->
              <div class="row m-0 align-content-center" 
              style="height: 192px; position: absolute; top: 0; width:100%; pointer-events: none;">
                  <img :src="require(`@/assets/images/Title.png`)" style="width:100%;padding:0px;"/>
              </div>
          </farm>
      </div>
      <div>1</div>
  </div>

</template>

<script>
import {App} from "@/App.ts"
import IgtNotifications from "@/components/util/igt-notifications";
import IgtProgressBar from './components/util/igt-progress-bar.vue';
import IgtToolIcons from './controls/controller/tool-icons/igt-tool-icons.vue';
import BeanList from '@/controls/controller/beanlist/bean-list.vue';
import Farm from '@/controls/farm/farm.vue';

export default {
  components: {
    IgtNotifications,
    IgtProgressBar,
    IgtToolIcons,
    BeanList,
    Farm,
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
