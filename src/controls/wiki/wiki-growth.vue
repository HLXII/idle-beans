<template>
    <div>
        <div class="border2 my-3">
            <div class="flex">
                <svg-icon :icon="plantIcon" />
                <div class="px-1">
                    <span class="align-middle">
                        <game-text :text="plantName" :controller="controller"/>
                    </span>
                </div>
            </div>
            <game-text :text="growth.description" :controller="controller" />
        </div>
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";
import Plants from "@/scripts/plant/Plants";
import Growth from "@/scripts/plant/growths/Growth";
import GameText from '../game-text.vue';
import SvgIcon from '../svg-icon.vue';
import { PlantIcons } from '@/scripts/plant/PlantImages';
import { LinkType } from '@/scripts/controls/GameText';

export default {
    name: "wiki-growth",
    components: {
        GameText,
        SvgIcon,
    },
    props: {
        growth: {
            type: Growth,
            required: true,
        },
        controller: {
            type: GameController,
            required: true,
        },
        plants: {
            type: Plants,
            required: true,
        },
    },
    computed: {
        plant() {
            return this.plants.list[this.growth.plant];
        },
        plantIcon() {
            if (!this.plant.unlocked) {
                return PlantIcons['Missing Plant'];
            }
            return this.plant.icon;
        },
        plantName() {
            return [{
                text: this.growth.plant,
                type: LinkType.Plant,
                id: this.growth.plant,
            }];
        }
    },
    methods: {

    },
}
</script>

<style scoped>
</style>
