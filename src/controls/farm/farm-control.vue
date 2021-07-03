<template>
    <div class="border2 bg-generic">
        <!-- Farm Selector -->
        <div class="flex" v-if="hasMultipleFarms">
            <div class="mr-1">
                Farms:
            </div>
            <div class="flex-1">
                <!-- TODO -->
            </div>
        </div>
        <!-- Farm Controls -->
        <div class="float-right">
          <div class="flex gap-1">
              <div><span class="align-middle">Settings:</span></div>
              <icon-toggle :setting="displayPlantIconsSetting"
                  :trueIcon="require(`@/assets/images/icons/Plant Icon Icon.png`)"
                  :falseIcon="require(`@/assets/images/icons/Plant Icon.png`)"
                  :trueTooltip="`Displaying Plants using icons.`"
                  :falseTooltip="`Displaying Plants using images.`"></icon-toggle>
              <icon-toggle :setting="displayPlantStatusSetting"
                  :trueIcon="require(`@/assets/images/icons/Status Bar Icon.png`)"
                  :falseIcon="require(`@/assets/images/icons/No Status Bar Icon.png`)"
                  :trueTooltip="`Displaying Plant statuses.`"
                  :falseTooltip="`Not displaying Plants statuses.`"></icon-toggle>
          </div>
        </div>
        <div class="flex gap-1">
            <!-- TODO: Create Icons for farm types -->
            <icon :image=tempImage></icon>
            <div><span class="align-middle">{{farm.name}}</span></div>
        </div>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import IconToggle from '@/controls/settings/icon-toggle.vue';
import Icon from '../icon.vue';

export default {
    name: "farm-control",
    components: {
        IconToggle,
        Icon,
    },
    data() {
        return {
            farms: App.game.features.farms,
            controller: App.game.features.controller,
            settings: App.game.features.settings,
            farm: App.game.features.farms.farms[App.game.features.farms.activeFarm],
        }
    },
    computed: {
        tempImage() {
            return require(`@/assets/images/icons/None Icon.png`);
        },
        availableFarms() {
            return this.farms.availableFarms;
        },
        hasMultipleFarms() {
            return this.farms.hasMultipleFarms;
        },
        displayPlantIconsSetting() {
            return this.settings.getSetting('displayPlantIcons');
        },
        displayPlantStatusSetting() {
            return this.settings.getSetting('displayPlantStatus');
        }
    },
    methods: {

    },
}
</script>

<style scoped>
</style>
