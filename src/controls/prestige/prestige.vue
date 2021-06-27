<template>
    <div class="border2">
        <div>
            <!-- Add Floating Icon for Prestige -->
            <div class="float-right"><game-button text="Prestige" :onClick="triggerPrestige" :enabled="prestige.canPrestige"/></div>
            <div>{{prestige.name}}</div>
            <div><game-text :text="prestige.description" :controller="controller" /></div>
        </div>
        <div>
            <status-table>
                <status :label="prestige.label" :percent="prestige.percent" :text="prestige.text"/>
            </status-table>
        </div>
    </div>
</template>

<script>
import Prestige from '@/scripts/prestige/Prestige'
import GameText from '../game-text.vue'
import GameController from '@/scripts/GameController'
import GameButton from '../game-button.vue'
import StatusTable from '../farm/plot-modal/status-table.vue'
import Status from '../farm/plot-modal/status.vue'

export default {
    name: "prestige",
    components: {
        GameText,
        GameButton,
        StatusTable,
        Status
    },
    props: {
        prestige: {
            type: Prestige,
            required: true,
        },
        controller: {
            type: GameController,
            required: true,
        }
    },
    methods: {
        triggerPrestige() {
            this.prestige.triggerPrestige();
        }
    },
    computed: {

    },
}
</script>

<style scoped>
</style>
