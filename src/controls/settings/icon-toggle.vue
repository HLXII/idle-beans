<template>
    <div class="btn" @click="toggle">
        <icon :image=icon v-bind:class="{'has-tooltip': 'hasTooltip'}" >
            <tooltip v-if="hasTooltip" position="top-right" width=56>
                <div class="text-center">{{tooltip}}</div>
            </tooltip>
        </icon>
    </div>
</template>

<script>
import {BooleanSetting} from "incremental-game-template";
import Icon from '@/controls/icon';
import Tooltip from '@/controls/tooltip';

export default {
    name: "icon-toggle",
    components: {
        Icon,
        Tooltip,
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