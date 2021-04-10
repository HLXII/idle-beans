<template>
    <div>
        <div class="flex">
            <div class="p-1" style="position: relative;">
                <div class="border4"><img width="64px" :src=plant.data.icon /></div>
            </div>
            <div class="flex-grow">
                <div class="flex">
                    <div class="plantName">{{plant.type}}</div>
                    
                    <div class="flex-grow text-right" style="height: 32px;" >
                        <icon :image=originBean.image class="has-tooltip" >
                            <div class="tooltip right-0 w-56">
                                <div class="mt-1">
                                    <div class="border2 text-center">Planted using a {{plant.originBean}}</div>
                                </div>
                            </div>
                        </icon>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="col text-end" data-bind="text: 'Age: ' + plant.age()">Age: {{plant.age}}</div>
                </div>
            </div>
        </div>
        <div class="flex p-1">
            <div class="has-tooltip">
                <button type="button" class="btn btn-red border2" style="width: 84px;" v-on:click="harvest">
                    Harvest
                </button>
                <div class="tooltip w-60">
                    <div class="mt-1">
                        <div class="border2 text-center" v-html="harvestGainMessage"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {App} from "@/App.ts";
import PlantState from "@/scripts/plant/PlantState";
import Icon from '@/controls/icon';

export default {
    name: "plant-details",
    data() {
        return {
            farms: App.game.features.farms,
        }; 
    },
    components: {
        Icon
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
        }
    },
    methods: {
        harvest() {
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
