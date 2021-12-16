<template>
    <div style="display: inline-block; position: relative;" v-bind:style="{minWidth: sizeStyle}">
        <div v-bind:class="[bg, borderClass]"
            v-bind:style="{width: borderSize, height: borderSize}" style="position: absolute;" />
        <img style="position: relative;" :style="{width: sizeStyle, height: sizeStyle}" :src="image"/>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "icon",
    props: {
        image: {
            type: String,
        },
        bg: {
            type: String,
            default: 'bg-icon',
        },
        size: {
            type: Number,
            default: 32,
        },
        border: {
            type: Number,
            default: 2,
        }
    },
    computed: {
        borderSize() {
            if (this.border == 4) {
                return `${this.size - 8}px`;
            } else {
                return `${this.size - 4}px`;
            }
        },
        sizeStyle() {
            return `${this.size}px`;
        },
        borderClass() {
            if (this.border == 4) {
                return 'border4';
            } else {
                return 'border2';
            }
        },
    }
}
</script>

<style>
.bg-icon {
    @apply bg-yellow-200 dark:bg-gray-500;
}
</style>
