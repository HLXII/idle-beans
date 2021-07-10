<template>
    <div class="flex flex-col border2 bg-generic" style="flex-grow: 1; height: 0px; min-height: 320px;">
        <span class="btn bg-white dark:bg-gray-700 flex text-center justify-center border2 mb-1" @click="clearCart">Clear Cart</span>
        <div class="flex flex-col gap-1">
            <div v-for="packet in prestige.selectedBeanPackets" :key="packet">{{packet}}</div>
        </div>
    </div>
</template>

<script>
import {App} from "@/App.ts"

export default {
    name: "seed-cart",
    components: {

    },
    data() {
        return {
        controller: App.game.features.controller,
        prestige: App.game.features.prestige,
        }
    },
    computed: {

    },
    methods: {
        clearCart() {
            this.prestige.clearCart();
        }
    }
}
</script>

<style scoped>
.logContainer {
    overflow-y: scroll;
    flex-grow: 1;
    scroll-snap-type: y proximity;
}
</style>
