<template>
    <div class="btn" @click="toggle">
        <icon :image=icon v-bind:class="{'has-tooltip': 'hasTooltip'}" >
            <div class="tooltip left-0 w-56 mt-1">
                <div>
                    <div class="border2 bg-generic text-center">{{tooltip}}</div>
                </div>
            </div>
        </icon>
    </div>


</template>

<script>
import {BooleanSetting} from "@/ig-template/features/settings/BooleanSetting";
import Icon from '@/controls/icon';

export default {
    name: "icon-toggle",
    components: {
        Icon,
    },
    props: {
        setting: {
        type: BooleanSetting,
        required: true,
        },
        trueIcon: {
        type: String,
        required: true,
        },
        trueTooltip: {
            type: String,
            default: '',
        },
        falseIcon: {
        type: String,
        required: true,
        },
        falseTooltip: {
            type: String,
            default: '',
        },
    },
    methods: {
        toggle() {
            this.setting.toggle();
        },
    },
    computed: {
        icon() {
            return this.setting.value ? this.trueIcon : this.falseIcon;
        },
        hasTooltip() {
            if (this.setting.value) {
                return !!this.trueTooltip;
            } else {
                return !!this.falseTooltip;
            }
        },
        tooltip() {
            if (this.setting.value) {
                return this.trueTooltip;
            } else {
                return this.falseTooltip;
            }
        },
    }
}
</script>

<style scoped>
</style>