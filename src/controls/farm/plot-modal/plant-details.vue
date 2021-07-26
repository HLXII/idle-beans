<template>
    <div>
        <entity-details :entity="plant" :wiki="wiki" :farms="farms">
            <template v-slot:topRightContent>
                <icon :image=originBean.image class="has-tooltip" >
                    <tooltip position="bottom-left" :interactable="false" width=56>
                        <div class="text-center">Planted using a {{plant.originBean}}</div>
                    </tooltip>
                </icon>
            </template>
            <template v-slot:bottomRightContent>
                <div class="has-tooltip" style="position:relative;">
                    <button type="button" class="btn btn-red border2 has-tooltip" style="width: 84px;" v-on:click="remove">
                        Remove
                    </button>
                    <tooltip position="bottom-left" :interactable="true">
                        <game-text class="whitespace-nowrap" :text="plant.removeGainMessage" :wiki="wiki"/>
                    </tooltip>
                </div>
            </template>
        </entity-details>
    </div>
</template>

<script>
import {App} from "@/App.ts";
import PlantState from "@/scripts/plant/PlantState";
import Icon from '@/controls/utility/icon.vue';
import Tooltip from "@/controls/utility/tooltip.vue";
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
        Tooltip,
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
