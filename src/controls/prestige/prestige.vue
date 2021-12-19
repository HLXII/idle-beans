<template>
    <div class="border2 bg-generic">
        <div>
            <!-- Add Floating Icon for Prestige -->
            <div class="float-right">
                <v-popover popoverClass="interact">
                    <game-button bg="bg-red-500" text="Prestige" :onClick="triggerPrestige" :enabled="prestige.canPrestige"/>
                    <div slot="popover">
                        <game-text class="whitespace-nowrap" :text="prestige.rewardText" :wiki="wiki"/>
                    </div>
                </v-popover>
            </div>
            <div>{{prestige.name}}</div>
            <div><game-text :text="prestige.description" :wiki="wiki" /></div>
        </div>
        <div>
            <status-table>
                <status :status="prestige.status" />
            </status-table>
        </div>
    </div>
</template>

<script>
import Prestige from '@/scripts/prestige/Prestige'
import GameText from '@/controls/utility/game-text.vue'
import GameButton from '@/controls/utility/game-button.vue'
import StatusTable from '@/controls/farm/plot/status-table.vue'
import Status from '@/controls/farm/plot/status.vue'
import Wiki from '@/scripts/wiki/Wiki'

export default {
    name: "prestige",
    components: {
        GameText,
        GameButton,
        StatusTable,
        Status,
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
