<template>
    <div class="border2 bg-generic">
        <div>
            <!-- Add Floating Icon for Prestige -->
            <div class="float-right">
                <div class="has-tooltip" style="position: relative;display:inline-block;">
                    <game-button bg="bg-red-500" text="Prestige" :onClick="triggerPrestige" :enabled="prestige.canPrestige"/>
                    <tooltip :interactable="true" position="bottom-left">
                        <game-text class="whitespace-nowrap" :text="prestige.rewardText" :wiki="wiki"/>
                    </tooltip>
                </div>
            </div>
            <div>{{prestige.name}}</div>
            <div><game-text :text="prestige.description" :wiki="wiki" /></div>
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
import GameButton from '@/controls/utility/game-button.vue'
import StatusTable from '@/controls/farm/plot-modal/status-table.vue'
import Status from '@/controls/farm/plot-modal/status.vue'
import Tooltip from '@/controls/utility/tooltip.vue'
import Wiki from '@/scripts/wiki/Wiki'

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
        wiki: {
            type: Wiki,
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
