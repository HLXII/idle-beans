<template>
    <div class="border2" :class="packetClass" @click="packetClick(packet.name)">
        <div>{{packet.name}}</div>
        <div>
            <game-text :text="description" :wiki="wiki"/>
        </div>
        <div>
            <game-text :text="costText" :wiki="wiki"/>
        </div>
    </div>
</template>

<script>
import GameText from '@/controls/utility/game-text.vue'
import GameHelper from '@/scripts/GameHelper'
import BeanPacket from '@/scripts/prestige/BeanPacket'
import PrestigeHandler from '@/scripts/prestige/PrestigeHandler'
import Wiki from '@/scripts/wiki/Wiki'

export default {
    name: "seed-packet",
    components: {
        GameText,
    },
    props: {
        packet: {
            type: BeanPacket,
            required: true,
        },
        selected: {
            type: Boolean,
            required: true,
        },
        prestige: {
            type: PrestigeHandler,
            require: true,
        },
        wiki: {
            type: Wiki,
            required: true,
        },
    },
    methods: {
        packetClick(packetName) {
            if (this.prestige.selectedBeanPackets.includes(packetName)) {
                this.prestige.removePacket(packetName);
            } else {
                this.prestige.addPacket(packetName);
            }
        },
    },
    computed: {
        description() {
            return [
                'Contains: ',
                ...GameHelper.beanAmount(this.packet.contents),
            ]
        },
        costText() {
            return [
                'Costs: ',
                ...GameHelper.beanAmount(this.packet.cost),
            ];
        },
        packetClass() {
            if (this.prestige.selectedBeanPackets.includes(this.packet.name)) {
                return 'selected';
            } else {
                return 'bg-generic';
            }
        }
    },
}
</script>

<style scoped>
.selected {
    @apply bg-green-500;
}
.disabled {
    opacity: 0.25;
}
</style>
