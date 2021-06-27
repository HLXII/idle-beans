
<template>
        <div type="button" class="game-button border2 text-xs text-center" :class="[bg, enabled ? 'btn' : 'disabled']" v-on:click="onClick">
            {{text}}
            <slot></slot>
        </div>
        
</template>

<script>
export default {
    name: "game-button",
    props: {
        bg: {
            type: String,
            default: 'bg-generic',
        },
        text: {
            type: String,
            required: true,
        },
        onClick: {
            type: Function,
            required: true,
        },
        enabled: {
            type: Boolean,
            default: true,
        }
    },
    computed: {

    },
}
</script>

<style scoped>
.game-button {
    position: relative;
}

.disabled {
    opacity: .5;
}
</style>
