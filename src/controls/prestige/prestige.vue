<template>
    <div class="border2 bg-generic">
        <div>
            <!-- Add Floating Icon for Prestige -->
            <div class="float-right">
                <div class="has-tooltip" style="position: relative;display:inline-block;">
                    <game-button text="Prestige" :onClick="triggerPrestige" :enabled="prestige.canPrestige"/>
                    <tooltip :interactable="true" position="bottom-left">
                        <game-text class="whitespace-nowrap" :text="prestige.rewardText" :controller="controller"/>
                    </tooltip>
                </div>
            </div>
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
import GameText from '@/controls/utility/game-text.vue'
import GameController from '@/scripts/GameController'
import GameButton from '@/controls/utility/game-button.vue'
import StatusTable from '@/controls/farm/plot-modal/status-table.vue'
import Status from '@/controls/farm/plot-modal/status.vue'
import Tooltip from '@/controls/utility/tooltip.vue'

export default {
    name: "prestige",
    components: {
        GameText,
        GameButton,
        StatusTable,
        Status,
        Tooltip,
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
        },
    },
    computed: {
    },
}
</script>

<style scoped>
</style>
