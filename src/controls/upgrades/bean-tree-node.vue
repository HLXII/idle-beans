<template>
    <li>
        <span class="tf-nc upgrade">
            <icon class="upgrade-icon" :image="upgrade.image" :size="64" :border="4">
            </icon>
        </span>
        <ul v-if="upgrade.children.length">
            <bean-tree-node v-for="child in upgrade.children" :key="child" :upgrades="upgrades" :wiki="wiki" :upgradeId="child" />
        </ul>
    </li>
</template>

<script>
import Upgrades from '@/scripts/upgrade/Upgrades'
import Icon from '../utility/icon.vue';
import Wiki from '@/scripts/wiki/Wiki';

export default {
    name: "bean-tree-node",
    components: {
        Icon,
    },
    props: {
        upgrades: {
            type: Upgrades,
            required: true,
        },
        wiki: {
            type: Wiki,
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

.upgrade-tree .tf-nc {
    padding: 0;
    /* Setting to slightly less than 64 to avoid gaps */
    height: 62px;
    width: 62px;
    border: none;
}

.upgrade-icon {
    transform: rotateX(180deg);
}

.upgrade-tree .tf-nc:before,
.upgrade-tree .tf-nc:after {
    border-left-color: black;
    border-left-width: 4px;
}

.upgrade-tree li li:before {
    border-top-color: black;
    border-top-width: 4px;
}



</style>
