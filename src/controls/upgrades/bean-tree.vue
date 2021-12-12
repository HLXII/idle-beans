<template>
  <div v-dragscroll style="overflow:auto">
      <div class="tf-tree">
          <bean-tree-node :upgrades="upgrades" :upgradeId="selectedBean.baseUpgrade" />
      </div>
  </div>
</template>

<script>
import Beans from '@/scripts/bean/Beans'
import Bean from '@/scripts/bean/Bean'
import Upgrades from '@/scripts/upgrade/Upgrades'
import BeanTreeNode from './bean-tree-node.vue'

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

</style>
