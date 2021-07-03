<template>
    <button v-bind:class="['nav-button', 'border2', active ? 'nav-button-active': '']" @click="clickTab">{{tabName}}</button>
</template>

<script>

export default {
    name: "nav-button",
    props: {
        tabName: {
            type: String,
            required: true,
        },
        tabType: {
            type: Number,
            required: true,
        },
        activeTab: {
            type: Number,
            required: true,
        },
        changeTab: {
            type: Function,
            required: true,
        },
    },
    computed: {
        active() {
            return this.activeTab === this.tabType;
        },
    },
    methods: {
        clickTab() {
            this.changeTab(this.tabType);
        },
    },
}
</script>

<style scoped>
.nav-button {
    @apply block hover:bg-red-200 focus:outline-none;
}
.nav-button-active {
    @apply bg-red-500 hover:bg-red-500 text-white;
}
</style>
