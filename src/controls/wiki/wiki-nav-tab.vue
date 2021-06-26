<template>
    <button v-bind:class="['nav-button', 'border2', active ? 'nav-button-active': '']" @click="clickTab">{{tabName}}</button>
</template>

<script>

export default {
    name: "wiki-nav-tab",
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
    @apply text-gray-600 block mr-2 hover:text-blue-500 focus:outline-none;
}
.nav-button-active {
    @apply text-blue-500 border-blue-500;
}
</style>
