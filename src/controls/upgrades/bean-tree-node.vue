<template>
    <li>
        <span class="tf-nc upgrade" :class="purchased ? 'purchased' : 'unpurchased'">
            <v-popover popoverClass="interact" :disabled="!parentPurchased">
                <div @click="purchase()">
                    <icon class="upgrade-icon" :image="image" :size="64" :border="4" />
                </div>
                <div slot="popover">
                    <game-text :text="upgrade.description" :wiki="wiki" />
                    <br>
                    <game-text v-if="!purchased" :text="cost" :wiki="wiki" />
                </div>
            </v-popover>
        </span>
        <ul v-if="upgrade.children.length && parentPurchased">
            <bean-tree-node v-for="child in upgrade.children" :key="child" :upgrades="upgrades" :wiki="wiki" :upgradeId="child" :parentPurchased="upgrade.purchased" />
        </ul>
    </li>
</template>

<script>
import Upgrades from '@/scripts/upgrade/Upgrades'
import Icon from '../utility/icon.vue';
import Wiki from '@/scripts/wiki/Wiki';
import GameText from '../utility/game-text.vue';
import GameHelper from '@/scripts/GameHelper';

export default {
    name: "bean-tree-node",
    components: {
        Icon,
        GameText,
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
        parentPurchased: {
            type: Boolean,
            required: true,
        }
    },
    computed: {
        upgrade() {
            return this.upgrades.list[this.upgradeId];
        },
        image() {
            return this.upgrade.getImage(this.parentPurchased);
        },
        cost() {
            return GameHelper.beanAmount(this.upgrade.cost);
        },
        purchased() {
            return this.upgrade.purchased;
        }
    },
    methods: {
        purchase() {
            if (this.upgrades.canPurchaseUpgrade(this.upgradeId)) {
                this.upgrades.purchaseUpgrade(this.upgradeId);
            }
        }
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

.unpurchased {
    opacity: .5;
}

</style>
