<template>
    <ul>
        <li>
            <span class="tf-nc">{{upgradeId}}</span>
            <bean-tree-node v-for="child in upgrade.children" :key="child" :upgrades="upgrades" :upgradeId="child" />
        </li>
    </ul>
</template>

<script>
import Upgrades from '@/scripts/upgrade/Upgrades'

export default {
    name: "bean-tree-node",
    components: {

    },
    props: {
        upgrades: {
            type: Upgrades,
            required: true,
        },
        upgradeId: {
            type: String,
            required: true,
        },
    },
    computed: {
        upgrade() {
            return this.upgrades.list[this.upgradeId];
        },
    },
    methods: {

    },
}
</script>

<style scoped>

</style>
