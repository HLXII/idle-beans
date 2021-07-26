<template>
    <div>
        <div class="border2">
            <div class="flex">
                <svg-icon :icon="plantIcon" />
                <div class="px-1">
                    <span class="align-middle">
                        <game-text :text="plantName" :wiki="wiki"/>
                    </span>
                </div>
            </div>
            <game-text :text="growth.description" :wiki="wiki" />
        </div>
    </div>
</template>

<script>
import Plants from "@/scripts/plant/Plants";
import Growth from "@/scripts/plant/growths/Growth";
import GameText from '@/controls/utility/game-text.vue';
import SvgIcon from '@/controls/utility/svg-icon.vue';
import { PlantIcons } from '@/scripts/plant/PlantImages';
import Wiki from '@/scripts/wiki/Wiki';
import { WikiType } from '@/scripts/wiki/WikiType';

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
        wiki: {
            type: Wiki,
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
                type: WikiType.Plant,
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
