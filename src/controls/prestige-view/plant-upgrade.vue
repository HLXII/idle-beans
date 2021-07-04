<template>
    <div class="border2 bg-generic" :class="[disabled ? 'upgradeDisabled' : '']" @click="purchase(upgrade.name)">
        <div>{{upgrade.name}}</div>
        <div>
            <game-text :text="upgrade.description" :controller="controller"/>
        </div>
        <div v-if="purchased" class="text-center">Purchased</div>
        <div v-else>
            <div class="text-center">Cost:</div>
            <div>
                <game-text :text="costText" :controller="controller"/>
            </div>
        </div>
    </div>
</template>

<script>
import GameText from '@/controls/utility/game-text.vue'
import GameController from '@/scripts/GameController'
import GameHelper from '@/scripts/GameHelper'
import Beans from '@/scripts/bean/Beans'
import AbstractUpgrade from '@/scripts/plant/upgrades/AbstractUpgrade'
import Plant from '@/scripts/plant/Plant'
import Plants from '@/scripts/plant/Plants'

export default {
    name: "plant-upgrade",
    components: {
        GameText,
    },
    props: {
        plant: {
            type: Plant,
            required: true,
        },
        upgrade: {
            type: AbstractUpgrade,
            required: true,
        },
        controller: {
            type: GameController,
            required: true,
        },
        plants: {
            type: Plants,
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
                this.plants.purchaseUpgrade(this.plant, upgradeId);
            }
        },
    },
    computed: {
        cost() {
            return this.upgrade.cost(this.plant.level);
        },
        costText() {
            return GameHelper.beanAmount(this.cost);
        },
        purchased() {
            return this.plant.purchasedUpgrades.includes(this.upgrade.name);
        },
        disabled() {
            return this.purchased || !this.beans.canAfford(this.cost);
        },
    },
}
</script>

<style scoped>
.upgradeDisabled {
    opacity: .25;
}
</style>
