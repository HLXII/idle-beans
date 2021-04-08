<template>
    <div class="plantImage">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 16 32" shape-rendering="crispEdges" v-on:click="clickPlant()">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path pointer-events="painted" stroke="#8db952" d="M8 11h1M9 12h1M9 13h1M9 14h2M10 15h1M10 16h1M9 17h1M9 18h1M9 19h1M8 20h1M8 21h1M7 22h2M6 23h2M6 24h2M5 25h1M8 25h1M9 26h1M4 27h1M9 27h1" />
            <path pointer-events="painted" stroke="#7fa34e" d="M10 17h1M10 18h1M10 19h1M9 20h1M9 21h1M9 22h1M8 23h1M8 24h1M6 25h2M5 26h1M8 26h1" />
        </svg>
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";

export default {
    name: "bean-vine",
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
