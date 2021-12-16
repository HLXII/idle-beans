<template>
    <div>
        <entity-details :entity="plant" :wiki="wiki" :farms="farms">
            <template v-slot:topRightContent>
                <icon :image=originBean.image v-tooltip.left-end="{content: `Planted using a ${plant.originBean}`}" />
            </template>
            <template v-slot:bottomRightContent>
                <v-popover popoverClass="interact">
                    <button type="button" class="btn btn-red border2" style="width: 84px;" v-on:click="remove">
                        Remove
                    </button>
                    <div slot="popover">
                        <game-text class="whitespace-nowrap" :text="plant.removeGainMessage" :wiki="wiki"/>
                    </div>
                </v-popover>
            </template>
        </entity-details>
    </div>
</template>

<script>
import {App} from "@/App.ts";
import PlantState from "@/scripts/plant/PlantState";
import Icon from '@/controls/utility/icon.vue';
import GameText from '@/controls/utility/game-text.vue';
import EntityDetails from './entity-details.vue';

export default {
    name: "plant-details",
    data() {
        return {
            farms: App.game.features.farms,
            wiki: App.game.features.wiki,
        }; 
    },
    components: {
        Icon,
        GameText,
        EntityDetails,
    },
    props: {
        plant: {
            type: PlantState,
            required: true,
        }
    },
    computed: {
        originBean() {
            return App.game.features.beans.list[this.plant.originBean];
        },
    },
    methods: {
        remove() {
            this.farms.removeEntity(this.plant.row, this.plant.col);
        },
        goToPlant() {
            this.wiki.goToPlant(this.plant.data.name);
        }
    }
}
</script>

<style scoped>

.plantName {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}

</style>
