<template>
    <div class="border2 bg-generic" :class="[disabled ? 'upgradeDisabled' : '']" @click="purchase(upgrade.id)">
        <div>{{upgrade.id}}</div>
        <div>
            <game-text :text="baseUpgrade.description" :controller="controller"/>
        </div>
        <template v-if="!displayOnly">
            <div v-if="upgrade.purchased" class="text-center">Purchased</div>
            <div v-else>
                <div class="text-center">Cost:</div>
                <div>
                    <game-text :text="costText" :controller="controller"/>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import GameText from '@/controls/utility/game-text.vue'
import GameController from '@/scripts/GameController'
import GameHelper from '@/scripts/GameHelper'
import Beans from '@/scripts/bean/Beans'
import UpgradeState from '@/scripts/plant/upgrades/UpgradeState'
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
            type: UpgradeState,
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
        displayOnly: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        purchase(upgradeId) {
            if (!this.disabled && !this.displayOnly) {
                this.plants.purchaseUpgrade(this.plant, upgradeId);
                this.controller.updatePrestigePlantTab();
            }
        },
    },
    computed: {
        baseUpgrade() {
            return this.plants.upgrades[this.upgrade.id];
        },
        costText() {
            return GameHelper.beanAmount(this.upgrade.cost);
        },
        disabled() {
            if (this.displayOnly) {
                return false; 
            }
            return this.upgrade.purchased || !this.beans.canAfford(this.upgrade.cost);
        },
    },
}
</script>

<style scoped>
.upgradeDisabled {
    opacity: .25;
}
</style>
