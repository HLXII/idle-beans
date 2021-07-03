<template>
    <div style="display: inline-block; position: relative;" v-bind:style="{minWidth: sizeStyle}">
        <div class="border2" v-bind:class="bg"
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
        }
    },
    computed: {
        borderSize() {
            return `${this.size - 4}px`;
        },
        sizeStyle() {
            return `${this.size}px`;
        },
    }
}
</script>

<style>
.bg-icon {
    @apply bg-yellow-200 dark:bg-gray-500;
}
</style>
