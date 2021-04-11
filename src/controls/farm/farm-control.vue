<template>
    <div class="border2 bg-generic mt-4">
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
        <div class="flex">
            <icon-toggle :setting="displayPlantIconsSetting"
                :trueIcon="require(`@/assets/images/icons/Wiki Icon.png`)"
                :falseIcon="require(`@/assets/images/icons/Settings Icon.png`)"
                :trueTooltip="`Displaying Plants using icons.`"
                :falseTooltip="`Displaying Plants using images.`"></icon-toggle>
        </div>
        <!-- Farm Status -->
    </div>
</template>

<script>
import {App} from "@/App.ts"
import IconToggle from '@/controls/settings/icon-toggle';
import {SettingId} from "@/ig-template/features/settings/SettingId";

export default {
    name: "farm-control",
    components: {
        IconToggle,
    },
    data() {
        return {
            farms: App.game.features.farms,
            controller: App.game.features.controller,
            settings: App.game.features.settings,
            farm: App.game.features.farms.farms[App.game.features.farms.activeFarm],
            SettingId,
        }
    },
    computed: {
        availableFarms() {
            return this.farms.availableFarms;
        },
        hasMultipleFarms() {
            return this.farms.hasMultipleFarms;
        },
        displayPlantIconsSetting() {
            return this.settings.getSetting(SettingId.DisplayPlantIcons);
        }
    },
    methods: {

    },
}
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
