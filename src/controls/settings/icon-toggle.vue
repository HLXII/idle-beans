<template>
    <div class="btn" @click="toggle">
        <icon :image=icon v-tooltip.left-end="{content: tooltip}" />
    </div>
</template>

<script>
import {BooleanSetting} from "incremental-game-template";
import Icon from '@/controls/utility/icon.vue';

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