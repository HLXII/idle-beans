<template>
    <div class="plantImage">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 16 16" shape-rendering="crispEdges" v-on:click="clickPlant()">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path pointer-events="painted" stroke="#ffdf50" d="M7 2h2M7 3h1M7 4h1" />
            <path pointer-events="painted" stroke="#d3a44f" d="M8 3h1" />
            <path pointer-events="painted" stroke="#b3c189" d="M9 3h1M9 4h1M9 5h1M8 6h1M7 7h2M7 8h1" />
            <path pointer-events="painted" stroke="#99b051" d="M9 6h1M9 7h1M8 8h1" />
        </svg>
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";

export default {
    name: "yellow-bean-sprout",
    props: {
        row: {
            type: Number,
            required: true,
        },
        col: {
            type: Number,
            required: true,
        },
        controller: {
            type: GameController,
            required: true,
        },
    },
    methods: {
        clickPlant() {
            this.controller.clickPlant(this.row, this.col);
        }
    },
}
</script>

<style scoped>

</style>
