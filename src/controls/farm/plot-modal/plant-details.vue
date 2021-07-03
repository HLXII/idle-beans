<template>
    <div>
        <div class="flex">
            <div class="border4 bg-icon mr-2">
                <svg width=64px xmlns="http://www.w3.org/2000/svg" :viewBox="icon.viewBox" shape-rendering="crispEdges">
                    <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
                    <path v-for="path in icon.paths" v-bind:key="path.stroke" pointer-events="painted" :stroke="path.stroke" :d="path.d" />
                </svg>
            </div>
            <div class="flex-1">
                <div class="flex py-1">
                    <div class="plantName">{{plant.type}}</div>
                    
                    <div class="flex-grow text-right" style="height: 32px;" >
                        <icon :image=originBean.image class="has-tooltip" >
                            <tooltip position="bottom-left" :interactable="false" width=56>
                                <div class="text-center">Planted using a {{plant.originBean}}</div>
                            </tooltip>
                        </icon>
                    </div>
                </div>
                <div class="py-1">
                    <div class="float-right">
                        <div class="has-tooltip" style="position:relative;">
                            <button type="button" class="btn btn-red border2 has-tooltip" style="width: 84px;" v-on:click="remove">
                                Remove
                            </button>
                            <tooltip width=60 position="bottom-left" :interactable="false">
                                <div v-html="harvestGainMessage"></div>
                            </tooltip>
                        </div>
                    </div>
                    <div>Age: {{plant.age}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {App} from "@/App.ts";
import PlantState from "@/scripts/plant/PlantState";
import Icon from '@/controls/icon.vue';
import Tooltip from "@/controls/tooltip.vue";

export default {
    name: "plant-details",
    data() {
        return {
            farms: App.game.features.farms,
        }; 
    },
    components: {
        Icon,
        Tooltip,
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
        harvestGainMessage() {
            return this.plant.harvestGainMessage;
        },
        icon() {
            return this.plant.icon;
        }
    },
    methods: {
        remove() {
            this.farms.removePlant(this.plant.row, this.plant.col);
        },
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
