<template>
    <div v-dragscroll class="tf-tree tf-gap-sm upgrade-tree" style="height: 100%;">
        <ul>
            <bean-tree-node :upgrades="upgrades" :wiki="wiki" :upgradeId="selectedBean.baseUpgrade" />
        </ul>
    </div>
</template>

<script>
import Beans from '@/scripts/bean/Beans'
import Bean from '@/scripts/bean/Bean'
import Upgrades from '@/scripts/upgrade/Upgrades'
import BeanTreeNode from './bean-tree-node.vue'
import Wiki from '@/scripts/wiki/Wiki'

export default {
    name: "bean-tree",
    components: {
        BeanTreeNode
    },
    props: {
        beans: {
            type: Beans,
            required: true,
        },
        upgrades: {
            type: Upgrades,
            required: true,
        },
        wiki: {
            type: Wiki,
            required: true,
        },
        selectedBean: {
            type: Bean,
            required: true,
        },
    },
    computed: {

    },
    methods: {

    },
}
</script>

<style scoped>

/* Hide scrollbar for Chrome, Safari and Opera */
.tf-tree.upgrade-tree::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.tf-tree.upgrade-tree {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.upgrade-tree { position: relative; }
.upgrade-tree > ul { transform: rotateX(180deg); }
.upgrade-tree li ul { margin-bottom: 1em; }

</style>
