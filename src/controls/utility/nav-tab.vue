<template>
    <div v-show="active" style="height: 100%;">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: "nav-tab",
    props: {
        tabType: {
            type: Number,
            required: true,
        },
        activeTab: {
            type: Number,
            required: true,
        },
    },
    computed: {
        active() {
            return this.activeTab == this.tabType;
        },
    },
}
</script>

<style scoped>

</style>
