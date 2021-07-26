<template>
    <div class="border2 bg-generic" :class="[disabled ? 'upgradeDisabled' : '']" @click="purchase(upgrade.name)">
        <div>{{upgrade.name}}</div>
        <div>
            <game-text :text="upgrade.description" :wiki="wiki"/>
        </div>
        <div v-if="upgrade.purchased" class="text-center">Purchased</div>
        <div v-else>
            <div class="text-center">Cost:</div>
            <div>
                <game-text :text="cost" :wiki="wiki"/>
            </div>
        </div>
    </div>
</template>

<script>
import GameText from '@/controls/utility/game-text.vue'
import GameHelper from '@/scripts/GameHelper'
import Upgrade from '@/scripts/upgrade/Upgrade'
import Beans from '@/scripts/bean/Beans'
import Upgrades from '@/scripts/upgrade/Upgrades'
import Wiki from '@/scripts/wiki/Wiki'

export default {
    name: "upgrade",
    components: {
        GameText,
    },
    props: {
        upgrade: {
            type: Upgrade,
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
        beans: {
            type: Beans,
            required: true,
        },
    },
    methods: {
        purchase(upgradeId) {
            if (!this.disabled) {
                this.upgrades.purchaseUpgrade(upgradeId);
            }
        },
    },
    computed: {
        cost() {
            return GameHelper.beanAmount(this.upgrade.cost);
        },
        disabled() {
            return this.upgrade.purchased || !this.beans.canAfford(this.upgrade.cost);
        }
    },
}
</script>

<style scoped>
.upgradeDisabled {
    opacity: .25;
}
</style>
